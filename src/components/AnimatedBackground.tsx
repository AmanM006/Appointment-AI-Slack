'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 4;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight / 2;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY / 2;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const time = Date.now() * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const waveHeight = canvas.height;

      // Fully black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, waveHeight);

      // Sharper radial glow following mouse
      const radius = canvas.width * 0.4;
      const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, radius);
      glow.addColorStop(0, 'rgba(180, 0, 255, 0.3)'); // Neon purple glow center
      glow.addColorStop(1, 'rgba(180, 0, 255, 0)');   // Fade out

      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, waveHeight);

      // Wave points
      const points: [number, number][] = [];
      for (let x = 0; x <= canvas.width; x += 10) {
        const y =
          Math.sin(x * 0.008 + time) * 20 +
          Math.sin(x * 0.015 + time * 0.8) * 10 +
          Math.sin(x * 0.03 + time * 0.5) * 5 +
          waveHeight * 0.4;
        points.push([x, y]);
      }

      // Create wave path
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
      ctx.lineTo(canvas.width, waveHeight);
      ctx.lineTo(0, waveHeight);
      ctx.closePath();

      // Blue → Yellow → Orange → Red gradient inside wave
      const waveGradient = ctx.createLinearGradient(0, 0, 0, waveHeight);
 waveGradient.addColorStop(0.5, 'rgba(128, 0, 128, 0.6)'); // Purple with 60% opacity (adjust as needed)
waveGradient.addColorStop(1, 'rgba(0, 0, 0, 0.6)');    // Black with 60% opacity
      ctx.fillStyle = waveGradient;
      ctx.fill();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
