// Multi-tier Anti-Spam Storage and Browser Device Fingerprint Utility
const STORAGE_KEY = 'portfolio_dm_lock_v1';
const DB_NAME = 'portfolio_antispam_db';
const DB_STORE = 'submissions';

/**
 * Generate a deterministic client fingerprint based on hardware/screen/canvas properties
 */
export function getDeviceFingerprint() {
  if (typeof window === 'undefined') return 'server';
  try {
    const screenInfo = `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`;
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const lang = navigator.language || '';
    const ua = navigator.userAgent || '';
    const cores = navigator.hardwareConcurrency || 1;

    // Fast canvas render hash
    let canvasHash = '';
    const canvas = document.createElement('canvas');
    canvas.width = 120;
    canvas.height = 30;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillStyle = '#f60';
      ctx.fillRect(10, 1, 62, 20);
      ctx.fillStyle = '#069';
      ctx.fillText('antispam_fp', 2, 15);
      ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
      ctx.fillText('antispam_fp', 4, 17);
      canvasHash = canvas.toDataURL().slice(-40);
    }

    const raw = `${screenInfo}|${tz}|${lang}|${cores}|${ua}|${canvasHash}`;
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      hash = (hash << 5) - hash + raw.charCodeAt(i);
      hash |= 0;
    }
    return `fp_${Math.abs(hash).toString(36)}`;
  } catch {
    return 'fp_fallback';
  }
}

// ── Cookie Helpers ──
function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name, value, days = 365) {
  if (typeof document === 'undefined') return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; path=/; SameSite=Lax`;
}

// ── IndexedDB Helpers ──
function openDB() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    try {
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(DB_STORE)) {
          db.createObjectStore(DB_STORE, { keyPath: 'id' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function getFromIndexedDB() {
  const db = await openDB();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(DB_STORE, 'readonly');
      const store = tx.objectStore(DB_STORE);
      const req = store.get(STORAGE_KEY);
      req.onsuccess = () => resolve(req.result ? req.result.data : null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function setToIndexedDB(data) {
  const db = await openDB();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(DB_STORE, 'readwrite');
      const store = tx.objectStore(DB_STORE);
      store.put({ id: STORAGE_KEY, data, updatedAt: Date.now() });
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    } catch {
      resolve(false);
    }
  });
}

/**
 * Check if the user has already sent a message across any browser storage layer
 */
export async function hasUserSentMessage() {
  if (typeof window === 'undefined') return false;

  // 1. Check localStorage
  let localData = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) localData = JSON.parse(raw);
  } catch {
    // Ignore localStorage disabled
  }

  // 2. Check sessionStorage
  let sessionData = null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) sessionData = JSON.parse(raw);
  } catch {
    // Ignore
  }

  // 3. Check Cookie
  let cookieData = null;
  try {
    const raw = getCookie(STORAGE_KEY);
    if (raw) cookieData = JSON.parse(raw);
  } catch {
    // Ignore
  }

  // 4. Check IndexedDB
  const idbData = await getFromIndexedDB();

  // Find if any tier has a valid submission record
  const record = localData || sessionData || cookieData || idbData;

  if (record && record.sent === true) {
    // Re-synchronize all storage tiers so that if localStorage was cleared, it is immediately restored
    const payload = JSON.stringify(record);
    try { localStorage.setItem(STORAGE_KEY, payload); } catch {}
    try { sessionStorage.setItem(STORAGE_KEY, payload); } catch {}
    try { setCookie(STORAGE_KEY, payload); } catch {}
    setToIndexedDB(record);
    return true;
  }

  return false;
}

/**
 * Record a message submission across all storage tiers
 */
export async function recordMessageSent(sender = '') {
  if (typeof window === 'undefined') return;

  const fingerprint = getDeviceFingerprint();
  const record = {
    sent: true,
    sender,
    fingerprint,
    timestamp: Date.now(),
  };

  const payload = JSON.stringify(record);

  // 1. localStorage
  try { localStorage.setItem(STORAGE_KEY, payload); } catch {}

  // 2. sessionStorage
  try { sessionStorage.setItem(STORAGE_KEY, payload); } catch {}

  // 3. Cookie (persists across storage clears unless cookies specifically deleted)
  try { setCookie(STORAGE_KEY, payload); } catch {}

  // 4. IndexedDB (separate subsystem from localStorage)
  await setToIndexedDB(record);
}
