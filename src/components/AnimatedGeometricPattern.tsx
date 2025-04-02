
import React, { useEffect, useState, useRef } from 'react';

const AnimatedGeometricPattern = () => {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [pulsePhase, setPulsePhase] = useState(0);
  const requestRef = useRef<number>();
  
  const animate = (time: number) => {
    // Slower, more deliberate animation
    setAnimationProgress((prev) => {
      return (prev + 0.002) % 1;
    });
    
    // Independent pulsing effect
    setPulsePhase((prev) => {
      return (prev + 0.01) % 1;
    });
    
    requestRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);
  
  // Endel/Plastikman inspired colors - more minimal, techno aesthetic
  const colors = [
    'rgba(255, 255, 255, 0.9)', // white
    'rgba(0, 186, 255, 0.8)',   // cyan
    'rgba(114, 0, 255, 0.7)',   // purple
    'rgba(255, 0, 128, 0.6)',   // magenta
    'rgba(0, 0, 0, 0.5)',       // black/gray
  ];
  
  const getColor = (index: number, opacity = 1) => {
    const color = colors[index % colors.length];
    return color.replace(/[\d.]+\)$/, `${opacity})`);
  };
  
  // Function to create subtle pulsing effect
  const getPulseOpacity = (baseOpacity = 0.7) => {
    return baseOpacity + Math.sin(pulsePhase * Math.PI * 2) * 0.2;
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-black p-4">
      <div className="w-full max-w-lg">
        <svg viewBox="0 0 600 600" className="w-full h-full">
          {/* Dark background */}
          <rect x="0" y="0" width="600" height="600" fill="#000" />
          
          {/* Grid system - Endel-inspired subtle background */}
          <g opacity={0.15}>
            {Array.from({ length: 12 }).map((_, i) => (
              <line 
                key={`grid-h-${i}`}
                x1="0"
                y1={i * 50}
                x2="600"
                y2={i * 50}
                stroke="#ffffff"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <line 
                key={`grid-v-${i}`}
                x1={i * 50}
                y1="0"
                x2={i * 50}
                y2="600"
                stroke="#ffffff"
                strokeWidth="0.5"
              />
            ))}
          </g>
          
          {/* Flowing circular patterns - Endel-inspired */}
          {Array.from({ length: 5 }).map((_, i) => {
            const radius = 250 - i * 30;
            const dashLength = 15 - i * 2;
            const dashGap = 10 - i;
            return (
              <circle
                key={`flow-${i}`}
                cx="300"
                cy="300"
                r={radius}
                fill="none"
                stroke={getColor(i, 0.2 + (i * 0.05))}
                strokeWidth={3 - i * 0.4}
                strokeDasharray={`${dashLength} ${dashGap}`}
                strokeDashoffset={animationProgress * -1000 * (i % 2 === 0 ? 1 : -1)}
              />
            );
          })}
          
          {/* Central rotating pattern - Plastikman-inspired */}
          <g 
            transform={`rotate(${animationProgress * 360}, 300, 300)`}
            opacity={getPulseOpacity()}
          >
            {/* Main diamond structure from original pattern */}
            <path
              d="M 300 100 L 500 300 L 300 500 L 100 300 Z"
              fill="none"
              stroke={getColor(1, 0.8)}
              strokeWidth="2"
            />
            
            {/* Inner diamond */}
            <path
              d="M 300 150 L 450 300 L 300 450 L 150 300 Z"
              fill="none"
              stroke={getColor(2, 0.7)}
              strokeWidth="1.5"
            />
            
            {/* Center square */}
            <rect
              x="250"
              y="250"
              width="100"
              height="100"
              fill="none"
              stroke={getColor(3, 0.9)}
              strokeWidth="1"
            />
            
            {/* Center cross */}
            <path
              d="M 300 225 L 300 375"
              stroke={getColor(0, getPulseOpacity(0.9))}
              strokeWidth="1"
            />
            <path
              d="M 225 300 L 375 300"
              stroke={getColor(0, getPulseOpacity(0.9))}
              strokeWidth="1"
            />
          </g>
          
          {/* Linear grid patterns that fade in and out - Plastikman inspired */}
          {Array.from({ length: 8 }).map((_, i) => {
            const yPos = 150 + i * 40;
            const opacity = Math.sin((animationProgress * 2 + i * 0.125) * Math.PI) * 0.5 + 0.2;
            return (
              <path
                key={`tech-line-${i}`}
                d={`M 100 ${yPos} L 500 ${yPos}`}
                stroke={getColor(i % colors.length, opacity)}
                strokeWidth="1"
                strokeDasharray={`${5 + i * 3} ${10 - i}`}
                strokeDashoffset={animationProgress * 1000 * (i % 2 === 0 ? 1 : -1)}
              />
            );
          })}
          
          {/* Corner maze patterns - inspired by the original */}
          {[0, 1, 2, 3].map((quadrant) => {
            const xBase = quadrant % 2 === 0 ? 100 : 500;
            const yBase = quadrant < 2 ? 100 : 500;
            const xDir = quadrant % 2 === 0 ? 1 : -1;
            const yDir = quadrant < 2 ? 1 : -1;
            
            return (
              <g key={`corner-${quadrant}`} opacity={getPulseOpacity(0.5)}>
                {Array.from({ length: 3 }).map((_, i) => (
                  <rect
                    key={`corner-rect-${quadrant}-${i}`}
                    x={xBase - (i * 10 * xDir)}
                    y={yBase - (i * 10 * yDir)}
                    width={20 + i * 20}
                    height={20 + i * 20}
                    fill="none"
                    stroke={getColor((quadrant + i) % colors.length, 0.4 + (i * 0.1))}
                    strokeWidth="1"
                    transform={`rotate(${animationProgress * 90 * (quadrant % 2 === 0 ? 1 : -1)}, ${xBase}, ${yBase})`}
                  />
                ))}
              </g>
            );
          })}
          
          {/* Plastikman-inspired pulsing dots along the diamond */}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            const pulseSize = Math.sin((pulsePhase * 5 + i / 16) * Math.PI * 2) * 2 + 3;
            const x = 300 + Math.cos(angle) * 200;
            const y = 300 + Math.sin(angle) * 200;
            
            return (
              <circle
                key={`pulse-dot-${i}`}
                cx={x}
                cy={y}
                r={pulseSize}
                fill={getColor(i % colors.length, getPulseOpacity(0.8))}
                stroke="none"
              />
            );
          })}
          
          {/* Subtle vertical bars that move horizontally - Plastikman-inspired */}
          <g opacity={0.3}>
            {Array.from({ length: 12 }).map((_, i) => {
              const xPos = ((animationProgress + (i / 12)) % 1) * 600;
              return (
                <rect
                  key={`tech-bar-${i}`}
                  x={xPos - 5}
                  y="100"
                  width="1"
                  height="400"
                  fill={getColor(i % colors.length, 0.5)}
                />
              );
            })}
          </g>
          
          {/* Central pulsing element */}
          <circle
            cx="300"
            cy="300"
            r={10 + Math.sin(pulsePhase * Math.PI * 2) * 5}
            fill="none"
            stroke={getColor(1, getPulseOpacity(0.9))}
            strokeWidth="2"
          />
          
          {/* Secondary smaller pulsing element */}
          <circle
            cx="300"
            cy="300"
            r={5 + Math.cos(pulsePhase * Math.PI * 4) * 2}
            fill={getColor(3, getPulseOpacity(0.7))}
            stroke="none"
          />
        </svg>
      </div>
      <div className="mt-4 text-center text-gray-400">
        <p className="text-sm">Endel × Plastikman inspired animation</p>
      </div>
    </div>
  );
};

export default AnimatedGeometricPattern;
