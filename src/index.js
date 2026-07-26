export default {
    async fetch(request, env) {
        const corsHeaders = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        };

        if (request.method === "OPTIONS") {
            return new Response(null, { status: 204, headers: corsHeaders });
        }

        try {
            const url = new URL(request.url);

            // Handles the message request from your React component
            if (url.pathname === "/api/message" || url.searchParams.has("message")) {
                const sender = url.searchParams.get("sender") || "Anonymous";
                const message = url.searchParams.get("message");
                const timestamp = url.searchParams.get("timestamp") || new Date().toISOString();

                if (!message) {
                    return new Response(
                        JSON.stringify({ success: false, error: "Missing message parameter" }),
                        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
                    );
                }

                const text = `💬 <b>New Portfolio Message!</b>\n\n<b>From:</b> ${sender}\n<b>Message:</b> "${message}"\n\n<i>${timestamp}</i>`;
                const telegramUrl = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

                const telegramRes = await fetch(telegramUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        chat_id: env.TELEGRAM_CHAT_ID,
                        text: text,
                        parse_mode: "HTML",
                    }),
                });

                const telegramData = await telegramRes.json();

                if (!telegramData.ok) {
                    return new Response(
                        JSON.stringify({ success: false, telegramError: telegramData.description }),
                        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
                    );
                }

                return new Response(
                    JSON.stringify({ success: true, message: "Sent to Telegram!" }),
                    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
                );
            }

            // Serve static assets (your React site) for everything else
            return env.ASSETS.fetch(request);

        } catch (err) {
            return new Response(
                JSON.stringify({ success: false, error: err.message }),
                { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }
    }
};