import Link from "next/link";

const navLinks = [
  { href: "/projects", label: "Projects", active: true },
  { href: "/about", label: "About", active: false },
];

export default function Header() {
  return (
    <header className="w-full border-b border-[#e8e4df] bg-[var(--page-bg)]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10 lg:px-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-serif text-2xl font-medium tracking-tight text-[var(--text-primary)] transition-opacity hover:opacity-80 md:text-[26px]"
          aria-label="Inicio"
        >
          G
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-10 md:gap-12" aria-label="Principal">
          {navLinks.map(({ href, label, active }) => (
            <Link
              key={href}
              href={href}
              className={`relative font-serif text-[15px] tracking-wide text-[var(--text-primary)] transition-opacity hover:opacity-80 md:text-base ${
                active ? "font-medium" : ""
              }`}
            >
              {label}
              {active && (
                <span
                  className="absolute -bottom-1 left-0 h-[1.5px] w-[85%] bg-[var(--text-primary)]"
                  aria-hidden
                />
              )}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-full border border-[var(--text-primary)] bg-[var(--page-bg)] px-5 py-2.5 font-serif text-[15px] tracking-wide text-[var(--text-primary)] transition-colors hover:bg-[var(--text-primary)] hover:text-[var(--page-bg)] md:text-base"
          >
            Contact Me
          </Link>
        </nav>
      </div>
    </header>
  );
}
