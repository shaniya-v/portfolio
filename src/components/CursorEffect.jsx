import React, { useEffect, useRef } from 'react';
import './CursorEffect.css';

const CursorEffect = () => {
  const canvasRef = useRef(null);
  const trail = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastX = null;
    let lastY = null;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Handle mouse move
    const handleMouseMove = (e) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      // Interpolate points for smooth continuous effect
      if (lastX !== null && lastY !== null) {
        const dx = currentX - lastX;
        const dy = currentY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.max(1, Math.ceil(distance / 5));

        for (let i = 0; i < steps; i++) {
          const t = i / steps;
          trail.current.push({
            x: lastX + dx * t,
            y: lastY + dy * t,
            life: 1
          });
        }
      }

      trail.current.push({
        x: currentX,
        y: currentY,
        life: 1
      });

      lastX = currentX;
      lastY = currentY;
      
      // Keep trail length manageable
      while (trail.current.length > 60) {
        trail.current.shift();
      }
    };

    // Handle touch move
    const handleTouchMove = (e) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const currentX = touch.clientX;
        const currentY = touch.clientY;

        if (lastX !== null && lastY !== null) {
          const dx = currentX - lastX;
          const dy = currentY - lastY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const steps = Math.max(1, Math.ceil(distance / 5));

          for (let i = 0; i < steps; i++) {
            const t = i / steps;
            trail.current.push({
              x: lastX + dx * t,
              y: lastY + dy * t,
              life: 1
            });
          }
        }

        trail.current.push({
          x: currentX,
          y: currentY,
          life: 1
        });

        lastX = currentX;
        lastY = currentY;
        
        while (trail.current.length > 60) {
          trail.current.shift();
        }
      }
    };

    // Animate
    const animate = () => {
      // Faster fade to clear shadow trails in ~2 seconds
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw smooth shooting star trail with tapering tail
      if (trail.current.length > 1) {
        trail.current.forEach((point, i) => {
          point.life -= 0.03;
          
          if (point.life > 0) {
            // Progress from oldest (0) to newest (1)
            const progress = i / trail.current.length;
            
            // Taper the tail - newest points are thicker, older points get thinner
            const tailTaper = Math.pow(progress, 0.8);
            const size = 12 * point.life * tailTaper;
            
            // Create smooth gradient glow
            const gradient = ctx.createRadialGradient(
              point.x, point.y, 0,
              point.x, point.y, size
            );
            
            // Fade older trail points more
            const alpha = point.life * tailTaper;
            gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 1})`);
            gradient.addColorStop(0.2, `rgba(250, 255, 255, ${alpha * 0.9})`);
            gradient.addColorStop(0.5, `rgba(240, 250, 255, ${alpha * 0.7})`);
            gradient.addColorStop(0.8, `rgba(225, 240, 255, ${alpha * 0.4})`);
            gradient.addColorStop(1, 'rgba(210, 230, 255, 0)');
            
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            ctx.globalAlpha = 1.2;
            ctx.filter = `blur(${15 + size * 0.3}px)`;
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        });
        
        // Remove dead points
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
