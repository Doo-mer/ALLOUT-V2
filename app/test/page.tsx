"use client"

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const containerRef = useRef(null);
  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({ container: containerRef });

  // Interpolate x, y, and scale based on scroll progress
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['50vw', '50vw', 'calc(100vw - 4rem)']
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['50vh', '50vh', '2rem']
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.5, 1.2, 1]);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory"
    >
      {/* Floating Motion Button */}
      <motion.button
        className="fixed bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold"
        style={{ x, y, scale }}
      >
        Click Me
      </motion.button>

      {/* Snap Section 1 */}
      <section className="h-screen snap-start flex items-center justify-center bg-neutral-100">
        <h1 className="text-3xl font-bold">Section 1</h1>
      </section>

      {/* Snap Section 2 */}
      <section className="h-screen snap-start flex items-center justify-center bg-neutral-200">
        <h1 className="text-3xl font-bold">Section 2</h1>
      </section>
    </div>
  );
}
