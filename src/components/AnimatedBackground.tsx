
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
    // Define colors as full RGB values without the opacity in the string
    const colors = [
      'rgba(138, 43, 226, 1)', // Purple
      'rgba(123, 104, 238, 1)', // MediumSlateBlue
      'rgba(106, 90, 205, 1)', // SlateBlue
      'rgba(147, 112, 219, 1)', // MediumPurple
      'rgba(153, 50, 204, 1)', // DarkOrchid
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
        this.size = Math.random() * 40 + 10; // Blob size
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
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
      
      // Background gradient
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGradient.addColorStop(0, 'rgba(18, 18, 20, 1)');
      bgGradient.addColorStop(0.5, 'rgba(23, 21, 35, 1)');
      bgGradient.addColorStop(1, 'rgba(15, 14, 22, 1)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add some grid lines
      ctx.lineWidth = 0.2;
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.1)';
      
      const gridSize = 50;
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

      // Central glow effect
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.4;
      
      const centerGlow = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      centerGlow.addColorStop(0, 'rgba(138, 43, 226, 0.1)');
      centerGlow.addColorStop(0.6, 'rgba(138, 43, 226, 0.05)');
      centerGlow.addColorStop(1, 'rgba(138, 43, 226, 0)');
      
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
