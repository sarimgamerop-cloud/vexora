// All GSAP motion. Libraries are passed in so the same code runs in the app and the single-file showcase.
export function initMotion({ gsap, ScrollTrigger, Lenis }) {
  gsap.registerPlugin(ScrollTrigger);
  const shoe = document.getElementById('shoe');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cleanups = [];

  // Smooth scroll, driven by GSAP's ticker
  const lenis = new Lenis({ lerp: 0.085 });
  lenis.on('scroll', ScrollTrigger.update);
  let marquee;
  const tick = (t) => {
    lenis.raf(t * 1000);
    if (marquee) marquee.timeScale(gsap.utils.interpolate(marquee.timeScale(), 1 + Math.abs(lenis.velocity) * 0.35, 0.1));
  };
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => { e.preventDefault(); lenis.scrollTo(a.getAttribute('href')); })
  );

  // Newsletter feedback
  document.querySelector('.news')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const b = e.currentTarget.querySelector('button');
    b.textContent = "You're on the list ✓";
    gsap.fromTo(b, { scale: 0.94 }, { scale: 1, duration: 0.8, ease: 'elastic.out(1, .5)' });
  });

  const ctx = gsap.context(() => {
    // Intro
    gsap.set(shoe, { yPercent: 17, scale: 0.84 });
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from('.hero__word', { yPercent: 110, duration: 1.4, stagger: 0.12 })
      .from(shoe, { y: 160, rotate: -14, scale: 0.8, opacity: 0, duration: 1.6 }, 0.2)
      .from('.fade', { y: 20, opacity: 0, duration: 1, stagger: 0.08 }, 0.7);

    if (reduce) return;

    // Idle float + pointer tilt
    gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut', duration: 2.6 } })
      .to('.shoe__float', { y: -30, rotate: 1.8 }, 0)
      .to('.shoe__shadow', { scaleX: 0.8, opacity: 0.4 }, 0);
    const mx = gsap.quickTo(shoe, 'x', { duration: 0.9, ease: 'power3' });
    const my = gsap.quickTo(shoe, 'y', { duration: 0.9, ease: 'power3' });
    const rot = gsap.quickTo('.shoe__tilt', 'rotateY', { duration: 0.9, ease: 'power3' });
    const move = (e) => {
      const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
      mx(nx * 50); my(ny * 30); rot(nx * 14);
    };
    addEventListener('pointermove', move);
    cleanups.push(() => removeEventListener('pointermove', move));

    // Shoe journey: hero → right → left → right → parked above the call to action
    gsap.timeline({
      scrollTrigger: { trigger: '.page', start: 'top top', endTrigger: '#drop', end: 'center center', scrub: 1 },
      defaults: { ease: 'none' },
    })
      .to(shoe, { xPercent: 26, yPercent: 4, rotate: 12, scale: 0.78, duration: 1 })
      .to(shoe, { xPercent: -26, yPercent: 0, rotate: -10, scale: 0.82, duration: 1 })
      .to(shoe, { xPercent: 24, yPercent: 2, rotate: 8, scale: 0.8, duration: 1 })
      .to(shoe, { xPercent: 0, yPercent: -27, rotate: -4, scale: 0.55, duration: 1 });

    // Shoe fades as the footer arrives
    gsap.to('.shoe__tilt', {
      opacity: 0, yPercent: -12, ease: 'none',
      scrollTrigger: { trigger: '.foot', start: 'top 95%', end: 'top 45%', scrub: true },
    });

    // Hero type drifts against the scroll
    gsap.to('.hero__title', { yPercent: -22, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

    // Masked line reveals
    gsap.utils.toArray('.lines').forEach((el) =>
      gsap.from(el.querySelectorAll('.ln > span'), {
        yPercent: 110, duration: 1.2, stagger: 0.1, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    );
    gsap.utils.toArray('.reveal, .eyebrow').forEach((el) =>
      gsap.from(el, { y: 36, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } })
    );

    // Count-up numbers
    gsap.utils.toArray('[data-count]').forEach((el) => {
      const end = +el.dataset.count, dec = +(el.dataset.dec || 0), o = { v: 0 };
      el.textContent = (0).toFixed(dec);
      gsap.to(o, { v: end, duration: 2.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => (el.textContent = o.v.toFixed(dec)) });
    });

    // Marquee speeds up with scroll velocity
    marquee = gsap.to('.marquee__track', { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });

    // Magnetic button
    const btn = document.querySelector('.btn');
    if (btn) {
      const bx = gsap.quickTo(btn, 'x', { duration: 0.6, ease: 'power3' }), by = gsap.quickTo(btn, 'y', { duration: 0.6, ease: 'power3' });
      const m = (e) => { const r = btn.getBoundingClientRect(); bx((e.clientX - r.left - r.width / 2) * 0.35); by((e.clientY - r.top - r.height / 2) * 0.5); };
      const l = () => { bx(0); by(0); };
      btn.addEventListener('pointermove', m); btn.addEventListener('pointerleave', l);
    }

    // Footer wordmark
    gsap.from('.foot__mark span', { yPercent: 105, duration: 1.3, stagger: 0.07, ease: 'expo.out', scrollTrigger: { trigger: '.foot__mark', start: 'top 95%' } });
  });

  return () => {
    cleanups.forEach((fn) => fn());
    ctx.revert();
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
}
