import { useEffect, useRef } from 'react';
import { Particle } from '../types';

interface ParticleSystemProps {
  particles: Particle[];
  onUpdate: (particles: Particle[]) => void;
}

export default function ParticleSystem({ particles, onUpdate }: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 크기 설정
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const updatedParticles = particles
        .map((particle) => {
          // 중력 효과
          const newVy = particle.vy + 0.5;
          const newX = particle.x + particle.vx;
          const newY = particle.y + newVy;
          const newLife = particle.life - 0.02;

          // 바닥에 닿으면 튕김
          let finalVy = newVy;
          let finalY = newY;
          if (newY > canvas.height - particle.size) {
            finalY = canvas.height - particle.size;
            finalVy = -newVy * 0.5; // 반발계수
          }

          // 파티클 그리기
          ctx.globalAlpha = newLife;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(newX, finalY, particle.size, 0, Math.PI * 2);
          ctx.fill();

          return {
            ...particle,
            x: newX,
            y: finalY,
            vx: particle.vx * 0.99, // 공기 저항
            vy: finalVy,
            life: newLife,
          };
        })
        .filter((p) => p.life > 0 && p.x > -50 && p.x < canvas.width + 50);

      onUpdate(updatedParticles);

      if (updatedParticles.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (particles.length > 0) {
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particles.length]); // particles.length로 재시작 감지

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 100,
      }}
    />
  );
}
