import React, { useEffect, useRef, useState } from 'react';
import './CursorEffect.css';

const CursorEffect = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);
  const trailLength = 8;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      setCursorPos({ x, y });
      
      // Update trail
      setTrail((prevTrail) => {
        const newTrail = [{ x, y, id: Date.now() + Math.random() }, ...prevTrail];
        return newTrail.slice(0, trailLength);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate smooth path through trail points
  const generateSmoothPath = () => {
    if (trail.length < 2) return '';
    
    let path = `M ${trail[0].x} ${trail[0].y}`;
    
    for (let i = 1; i < trail.length; i++) {
      const xc = (trail[i].x + trail[i - 1].x) / 2;
      const yc = (trail[i].y + trail[i - 1].y) / 2;
      path += ` Q ${trail[i - 1].x} ${trail[i - 1].y} ${xc} ${yc}`;
    }
    
    if (trail.length > 1) {
      const last = trail[trail.length - 1];
      path += ` L ${last.x} ${last.y}`;
    }
    
    return path;
  };

  return (
    <>
      {/* Smooth tail trail */}
      <svg className="cursor-trail-svg" width="100%" height="100%">
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
            <stop offset="50%" stopColor="rgba(200, 230, 255, 0.5)" />
            <stop offset="100%" stopColor="rgba(200, 230, 255, 0)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {trail.length > 1 && (
          <path
            d={generateSmoothPath()}
            stroke="url(#trailGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            filter="url(#glow)"
            opacity="0.8"
          />
        )}
      </svg>

      {/* Trail particles for extra glow */}
      {trail.map((pos, index) => (
        <div
          key={pos.id}
          className="cursor-trail-particle"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            opacity: (1 - (index / trailLength)) * 0.6,
            transform: `translate(-50%, -50%) scale(${1 - (index / trailLength) * 0.5})`,
          }}
        />
      ))}
      
      {/* Main star cursor */}
      <div
        className="cursor-star"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="white" stroke="white" strokeWidth="0.5"/>
        </svg>
      </div>
    </>
  );
};

export default CursorEffect;
