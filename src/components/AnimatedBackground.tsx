
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

    // Parameters for animation
    const particles: Particle[] = [];
    const particleCount = 60;
    
    // Updated colors to match the image with blue, orange, and red tones
    const colors = [
      'rgb(30, 64, 175)', // Deep blue
      'rgb(59, 130, 246)', // Medium blue
      'rgb(219, 100, 27)', // Orange
      'rgb(239, 68, 68)', // Red
      'rgb(30, 58, 138)', // Darker blue
    ];

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 60 + 20; // Larger blobs to match image
        this.speedX = (Math.random() - 0.5) * 0.2; // Slower movement
        this.speedY = (Math.random() - 0.5) * 0.2; // Slower movement
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size
        );
        
        // Extract RGB values from the color string
        const rgbValues = this.color.match(/\d+/g);
        if (!rgbValues || rgbValues.length < 3) return;
        
        const r = rgbValues[0];
        const g = rgbValues[1];
        const b = rgbValues[2];
        
        // Create properly formatted rgba strings with the appropriate opacity
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Updated background gradient to match the image with darker base and blue/orange gradient
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, 'rgb(10, 10, 20)'); // Very dark blue-black
      bgGradient.addColorStop(0.4, 'rgb(17, 24, 90)'); // Deep blue
      bgGradient.addColorStop(0.8, 'rgb(30, 64, 175)'); // Medium blue
      bgGradient.addColorStop(1, 'rgb(8, 8, 15)'); // Very dark blue-black
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

      // Draw and update particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Central glow effect with orange/blue colors to match the image
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.6;
      
      const centerGlow = ctx.createRadialGradient(
        centerX, centerY * 0.7, 0, // Move up slightly to match image
        centerX, centerY * 0.7, radius
      );
      centerGlow.addColorStop(0, 'rgba(239, 68, 68, 0.15)'); // Red glow
      centerGlow.addColorStop(0.3, 'rgba(219, 100, 27, 0.08)'); // Orange glow
      centerGlow.addColorStop(0.6, 'rgba(59, 130, 246, 0.12)'); // Blue glow
      centerGlow.addColorStop(1, 'rgba(30, 64, 175, 0)'); // Fade out
      
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add a wave effect at the bottom
      const waveGradient = ctx.createLinearGradient(0, canvas.height * 0.6, 0, canvas.height);
      waveGradient.addColorStop(0, 'rgba(30, 64, 175, 0)'); // Start transparent
      waveGradient.addColorStop(1, 'rgba(30, 64, 175, 0.3)'); // End with blue
      
      ctx.fillStyle = waveGradient;
      
      // Draw wave
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.8);
      
      // Create wave pattern
      for(let i = 0; i <= canvas.width; i += 50) {
        const height = Math.sin(i * 0.01 + (Date.now() * 0.001)) * 20;
        ctx.lineTo(i, canvas.height * 0.8 + height);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
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
