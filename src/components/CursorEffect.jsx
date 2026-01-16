import React, { useEffect, useRef } from 'react';
import './CursorEffect.css';

const CursorEffect = () => {
  const canvasRef = useRef(null);
  const trail = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let hueCounter = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Handle mouse move
    const handleMouseMove = (e) => {
      hueCounter = (hueCounter + 3) % 360;
      trail.current.push({
        x: e.clientX,
        y: e.clientY,
        hue: hueCounter,
        life: 1
      });
      
      // Keep trail length manageable
      if (trail.current.length > 35) {
        trail.current.shift();
      }
    };

    // Handle touch move
    const handleTouchMove = (e) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        hueCounter = (hueCounter + 3) % 360;
        trail.current.push({
          x: touch.clientX,
          y: touch.clientY,
          hue: hueCounter,
          life: 1
        });
        
        if (trail.current.length > 35) {
          trail.current.shift();
        }
      }
    };

    // Animate
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw smooth trail
      if (trail.current.length > 1) {
        for (let i = 0; i < trail.current.length; i++) {
          const point = trail.current[i];
          const nextPoint = trail.current[i + 1];
          
          // Fade trail naturally
          point.life -= 0.028;
          
          if (point.life > 0 && nextPoint) {
            ctx.save();
            
            // Draw flowing line segment with vibrant gradient
            const size = 35 * point.life;
            const gradient = ctx.createRadialGradient(
              point.x, point.y, 0,
              point.x, point.y, size
            );
            
            gradient.addColorStop(0, `hsla(${point.hue}, 100%, 65%, ${point.life * 0.9})`);
            gradient.addColorStop(0.3, `hsla(${(point.hue + 40) % 360}, 100%, 60%, ${point.life * 0.8})`);
            gradient.addColorStop(0.6, `hsla(${(point.hue + 80) % 360}, 100%, 65%, ${point.life * 0.6})`);
            gradient.addColorStop(1, `hsla(${(point.hue + 120) % 360}, 100%, 70%, 0)`);
            
            ctx.filter = 'blur(15px)';
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
          }
        }
        
        // Remove dead trail points
        trail.current = trail.current.filter(p => p.life > 0);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    animate();

    // Event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="cursor-effect" />;
};

export default CursorEffect;
