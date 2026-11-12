import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Page } from './Page.jsx';
import { initMotion } from './motion.js';

export default function App() {
  useEffect(() => initMotion({ gsap, ScrollTrigger, Lenis }), []);
  return <Page />;
}
