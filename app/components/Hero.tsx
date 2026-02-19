export default function Hero() {
  return (
    <section className="w-full bg-[var(--page-bg)]">
      <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-24 md:px-10 md:pt-24 md:pb-32 lg:px-16">
        <h1 className="font-serif text-4xl font-semibold leading-[1.15] tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl lg:text-7xl">
          Hey, I&apos;m Claudia
        </h1>
        <p className="mt-8 max-w-[580px] font-serif text-lg leading-[1.65] text-[var(--text-primary)] md:mt-10 md:text-[19px] md:leading-[1.7]">
          A UX UI designer, I create digital products that are meticulously
          designed with a user-first mindset, ensuring that every detail
          effectively meets the needs and expectations of users.
        </p>
      </div>
    </section>
  );
}
