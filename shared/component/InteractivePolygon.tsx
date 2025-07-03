import React, { useRef, useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

interface InteractivePolygonProps {
  size?: number;
  starPoints?: number;
  amplitude?: number;
  speed?: number;
  lerpFactor?: number;
}

const InteractivePolygon: React.FC<InteractivePolygonProps> = ({
  size = 320,
  starPoints = 8,
  amplitude = 5,
  speed = 0.002,
  lerpFactor = 1,
}) => {
  const center = size / 2;
  const vertexCount = starPoints * 2;
  const outerRadius = center * 0.9;
  const innerRadius = outerRadius * 0.28;

  // Precomputed base angles
  const baseAngles = useRef<number[]>(
    Array.from({ length: vertexCount }, (_, i) => (Math.PI * 2 / vertexCount) * i)
  ).current;

  // Initialize points alternating outer/inner for perfect star shape
  const [points, setPoints] = useState<Point[]>(
    baseAngles.map((angle, i) => {
      const baseR = i % 2 === 0 ? outerRadius : innerRadius;
      return {
        x: center + Math.cos(angle) * baseR,
        y: center + Math.sin(angle) * baseR,
      };
    })
  );

  // Animation loop
  useEffect(() => {
    let animationId: number;
    let startTime = performance.now();

    const animate = (time: number) => {
      const t = time - startTime;
      setPoints(prev =>
        prev.map((pt, i) => {
          const angle = baseAngles[i];
          const baseR = i % 2 === 0 ? outerRadius : innerRadius;
          const pulsate = amplitude * Math.sin(t * speed + i);
          const targetR = baseR + pulsate;
          const tx = center + Math.cos(angle) * targetR;
          const ty = center + Math.sin(angle) * targetR;
          return {
            x: pt.x + (tx - pt.x) * lerpFactor,
            y: pt.y + (ty - pt.y) * lerpFactor,
          };
        })
      );
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [amplitude, speed, lerpFactor, baseAngles, center, outerRadius, innerRadius]);

  const pointsString = points.map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' ');

  return (
    <svg
      width={size}
      height={size}
      className="mx-auto block"
    >
      <polygon points={pointsString} fill="white" />
    </svg>
  );
};

export default InteractivePolygon;
