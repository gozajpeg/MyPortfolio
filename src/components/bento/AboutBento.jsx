export default function AboutBento() {
  return (
    <section
      id="about"
      aria-label="About"
      className="theme-surface rounded-2xl border p-5 sm:p-6 flex flex-col gap-2"
    >
      <h2 className="font-sans text-base sm:text-lg font-semibold text-ink tracking-tight m-0">
        About
      </h2>
      <p className="font-sans text-sm text-ink-soft leading-relaxed m-0">
        I started in backend development, designing relational databases with PostgreSQL and MySQL and writing REST APIs in Node.js and Fastify. To ship complete products from start to finish, I expanded into frontend work with React and automated testing with Playwright, while building open-source CLI packages on npm that keep dependencies small and workflows simple.
      </p>
    </section>
  );
}
