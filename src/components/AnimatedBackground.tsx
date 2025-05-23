
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
      const currentTime = Date.now() * 0.001; // Convert to seconds for smoother animation
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, 'rgb(10, 10, 20)'); // Very dark blue-black at top
      bgGradient.addColorStop(0.4, 'rgb(17, 24, 90)'); // Deep blue in middle
      bgGradient.addColorStop(0.8, 'rgb(30, 64, 175)'); // Medium blue near bottom
      bgGradient.addColorStop(1, 'rgb(8, 8, 15)'); // Back to very dark at bottom
      
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
      
      // Central glow for accent
      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.4; // Move up slightly to match image
      const radius = Math.min(canvas.width, canvas.height) * 0.6;
      
      const centerGlow = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      centerGlow.addColorStop(0, 'rgba(239, 68, 68, 0.15)'); // Red glow
      centerGlow.addColorStop(0.3, 'rgba(219, 100, 27, 0.08)'); // Orange glow
      centerGlow.addColorStop(0.6, 'rgba(59, 130, 246, 0.12)'); // Blue glow
      centerGlow.addColorStop(1, 'rgba(30, 64, 175, 0)'); // Fade out
      
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Animated wave only at the top 20% of the screen
      const waveHeight = canvas.height * 0.2; // Top 20% of screen
      const waveY = 0; // Start at the top
      
      // Create wave gradient
      const waveGradient = ctx.createLinearGradient(0, waveY, 0, waveY + waveHeight);
      waveGradient.addColorStop(0, 'rgba(30, 64, 175, 0.1)');
      waveGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.15)');
      waveGradient.addColorStop(1, 'rgba(30, 64, 175, 0)');
      
      ctx.fillStyle = waveGradient;
      
      // Draw animated wave
      ctx.beginPath();
      ctx.moveTo(0, waveY);
      
      // Create wave pattern across the width
      for(let x = 0; x <= canvas.width; x += 20) {
        // Multiple sine waves with different frequencies and amplitudes
        const y1 = Math.sin(x * 0.01 + currentTime) * 15;
        const y2 = Math.sin(x * 0.02 - currentTime * 0.7) * 8;
        const y = waveY + y1 + y2;
        ctx.lineTo(x, y);
      }
      
      // Complete the wave shape
      ctx.lineTo(canvas.width, waveY);
      ctx.lineTo(canvas.width, waveY + waveHeight);
      ctx.lineTo(0, waveY + waveHeight);
      ctx.closePath();
      ctx.fill();
      
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
