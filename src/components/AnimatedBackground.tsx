
import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation function
    const animate = () => {
      const currentTime = Date.now() * 0.0005; // Slow down the animation
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background - dark blue to red color scheme
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, '#050533'); // Dark blue at top
      bgGradient.addColorStop(0.3, '#0a1863'); // Blue
      bgGradient.addColorStop(0.5, '#8d5d00'); // Yellow-orange
      bgGradient.addColorStop(0.7, '#b33d00'); // Orange
      bgGradient.addColorStop(1, '#800000'); // Dark red at bottom
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add subtle grid lines
      ctx.lineWidth = 0.3;
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.07)'; // Very subtle blue grid
      
      const gridSize = 40;
      // Horizontal lines
      for (let i = 0; i < canvas.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }
      
      // Vertical lines
      for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      
      // Calculate wave height to reach down to productivity tools section
      // This is approximately 40% of the screen height
      const waveHeight = canvas.height * 0.4; 
      const waveY = 0; // Start at the top
      
      // Create wave gradient with glow effect
      const waveGradient = ctx.createLinearGradient(0, waveY, 0, waveY + waveHeight);
      waveGradient.addColorStop(0, 'rgba(30, 64, 175, 0.2)'); // Blue with slight opacity
      waveGradient.addColorStop(0.4, 'rgba(59, 130, 246, 0.25)'); // Brighter blue in middle
      waveGradient.addColorStop(0.8, 'rgba(252, 211, 77, 0.2)'); // Yellow
      waveGradient.addColorStop(1, 'rgba(239, 68, 68, 0.1)'); // Red with fade out
      
      ctx.fillStyle = waveGradient;
      
      // Draw 2-3 slow moving waves
      ctx.beginPath();
      ctx.moveTo(0, waveY);
      
      // Wave 1 (slow moving)
      for(let x = 0; x <= canvas.width; x += 10) {
        const y1 = Math.sin(x * 0.003 + currentTime * 0.5) * 20;
        ctx.lineTo(x, waveY + y1);
      }
      
      // Continue to wave 2 (offset and slower)
      ctx.lineTo(canvas.width, waveY);
      ctx.lineTo(canvas.width, waveY + 30); // Small offset
      
      for(let x = canvas.width; x >= 0; x -= 10) {
        const y2 = Math.sin(x * 0.005 - currentTime * 0.3) * 15 + 30; // Offset wave
        ctx.lineTo(x, waveY + y2);
      }
      
      // Continue to wave 3 (further offset and even slower)
      ctx.lineTo(0, waveY + 60); // Another offset
      
      for(let x = 0; x <= canvas.width; x += 10) {
        const y3 = Math.sin(x * 0.004 + currentTime * 0.2) * 18 + 60; // Further offset wave
        ctx.lineTo(x, waveY + y3);
      }
      
      // Complete the wave shape to fill the top 40%
      ctx.lineTo(canvas.width, waveY + waveHeight);
      ctx.lineTo(0, waveY + waveHeight);
      ctx.closePath();
      ctx.fill();
      
      // Add glow effect to wave edges
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)'; // Reddish glow
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Add second glow for more intensity
      ctx.strokeStyle = 'rgba(252, 211, 77, 0.3)'; // Yellow glow
      ctx.lineWidth = 1;
      ctx.stroke();
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;
