// Pure markup. Rendered by React in the app and to static HTML for the single-file showcase.
const L = ({ children }) => <span className="ln"><span>{children}</span></span>;
const Eyebrow = ({ n, children }) => <p className="eyebrow"><b>{n}</b>{children}</p>;

const STATS = [
  [184, 0, 'g', 'Single shoe, US 9'],
  [6.2, 1, 'mm', 'Heel-to-toe offset'],
  [1200, 0, 'km', 'Lab-tested outsole'],
];
const PARTS = [
  ['Knit upper', 'Breathable mesh'],
  ['Rocker midsole', 'Soft landing, fast return'],
  ['Violet shank', 'Length-wise stability'],
  ['Carbon outsole', '1200 km tested'],
];
const COLS = [
  ['Collection', ['Volt Series 01', 'Silhouette', 'Technology', 'Anatomy']],
  ['Studio', ['Manifesto', 'Design notes', 'Credits', 'Contact']],
  ['Support', ['Sizing', 'Shipping', 'Returns', 'Care']],
  ['Follow', ['Instagram', 'X', 'TikTok', 'YouTube']],
];

const Logo = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true"><path fillRule="evenodd" d="M0 6h27l23 50L73 6h27L62 94H38Zm73.5 6H87L73 41Z" /></svg>
);

export function Page() {
  return (
    <div className="page">
      <header className="nav fade">
        <nav className="nav__side"><a href="#tech">Technology</a><a href="#numbers">Numbers</a></nav>
        <a href="#top" className="brand" aria-label="Vexora home"><Logo />VEXORA</a>
        <nav className="nav__side nav__side--end"><a href="#anatomy">Anatomy</a><a href="#drop" className="nav__cta">The drop</a></nav>
      </header>

      <div className="shoe" id="shoe" aria-hidden="true">
        <div className="shoe__tilt"><div className="shoe__shadow" /><div className="shoe__float">
          <img src="/shoe.svg" alt="" width="1600" height="1050" draggable="false" />
        </div></div>
      </div>

      <main id="top">
        <section className="hero">
          <h1 className="hero__title" aria-label="Move forward">
            <span className="hero__line"><span className="hero__word hero__word--outline">Move</span></span>
            <span className="hero__line"><span className="hero__word">Forward</span></span>
          </h1>
          <p className="hero__sub fade">Engineered for more.<br />Designed for you.</p>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {Array.from({ length: 8 }, (_, i) => <span key={i}>Engineered for more ◆ Step beyond ◆</span>)}
          </div>
        </div>

        <section className="block block--right" id="tech">
          <div>
            <Eyebrow n="01">Engineering</Eyebrow>
            <h2 className="lines"><L>Built light.</L><L>Land soft.</L></h2>
            <p className="reveal">A seamless knit shell moves with the foot. A sculpted midsole returns energy where it counts. A carbon-rubber outsole keeps the grip honest on wet ground.</p>
          </div>
        </section>

        <section className="block block--left" id="numbers">
          <div>
            <Eyebrow n="02">By the numbers</Eyebrow>
            <h2 className="lines"><L>Less weight.</L><L>More shoe.</L></h2>
            <ul className="stats">
              {STATS.map(([n, d, u, label]) => (
                <li key={label} className="reveal">
                  <strong><span data-count={n} data-dec={d}>{n.toFixed(d)}</span><small>{u}</small></strong>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="block block--right" id="anatomy">
          <div>
            <Eyebrow n="03">Anatomy</Eyebrow>
            <h2 className="lines"><L>Every layer</L><L>counts.</L></h2>
            <ul className="anat">
              {PARTS.map(([t, d]) => (
                <li key={t} className="reveal"><h3>{t}</h3><p>{d}</p></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="block block--end" id="drop">
          <div>
            <Eyebrow n="04">Volt Series 01</Eyebrow>
            <h2 className="lines lines--xl"><L>Step</L><L><em>beyond.</em></L></h2>
            <a className="btn" href="#top">Enter the drop <span>→</span></a>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="foot__top">
          <h3 className="lines"><L>Join the</L><L>frequency.</L></h3>
          <div>
            <p>Drop alerts and design notes. No noise, no spam, one email when something real happens.</p>
            <form className="news" noValidate>
              <input type="email" placeholder="you@email.com" aria-label="Email address" />
              <button type="submit">Subscribe <span>→</span></button>
            </form>
          </div>
        </div>

        <div className="foot__cols">
          <div className="foot__brand">
            <a href="#top" className="brand"><Logo />VEXORA</a>
            <p>Performance footwear concept. Light, soft and fast, in one violet current.</p>
          </div>
          {COLS.map(([h, items]) => (
            <div key={h}><h4>{h}</h4><ul>{items.map((i) => <li key={i}><a href="#top">{i}</a></li>)}</ul></div>
          ))}
        </div>

        <div className="foot__mark" aria-hidden="true">{'VEXORA'.split('').map((c, i) => <span key={i}>{c}</span>)}</div>

        <div className="foot__bar">
          <span>© 2026 Vexora Studio</span>
          <span>Concept showcase. A fictional brand, nothing is sold.</span>
          <span>React · GSAP · Lenis</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
