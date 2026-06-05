import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const ParticleHeadline = ({ onClick }: { onClick?: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    
    let ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    // Keep radius relatively large to scatter them well
    let mouse = { x: -1000, y: -1000, radius: 120 };
    let isHovering = false;

    class Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      ease: number;
      friction: number;
      
      constructor(x: number, y: number, color: string) {
        this.originX = x;
        this.originY = y;
        this.x = x + (Math.random() - 0.5) * 50; 
        this.y = y + Math.random() * 200 + 100;
        this.vx = 0;
        this.vy = 0;
        this.color = color;
        this.size = 1.5;
        this.ease = 0.03 + Math.random() * 0.05;
        this.friction = 0.85 + Math.random() * 0.05;
      }

      update() {
        if (isHovering) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                let force = (mouse.radius - distance) / mouse.radius;
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                this.vx -= forceDirectionX * force * 8;
                this.vy -= forceDirectionY * force * 8;
            }
        }
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.vx *= this.friction;
        this.vy *= this.friction;

        let dxOrigin = this.originX - this.x;
        let dyOrigin = this.originY - this.y;
        this.vx += dxOrigin * this.ease;
        this.vy += dyOrigin * this.ease;
      }
      
      draw(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    let isInit = false;

    const init = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      const isMobile = window.innerWidth < 1024;
      const fontSize = isMobile ? 56 : 72;
      
      // Draw text with same font and style (bold)
      ctx.font = `bold ${fontSize}px "DotGothic16", monospace`;
      ctx.textBaseline = 'top';
      ctx.textAlign = isMobile ? 'center' : 'left';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const lineHeight = fontSize * 0.85 + 8;
      const xPos = isMobile ? canvas.width / 2 : 0;
      
      ctx.fillStyle = 'white';
      ctx.fillText('WE BUILD', xPos, 0);
      ctx.fillText('SOFTWARE THAT', xPos, lineHeight);
      
      ctx.fillStyle = 'white';
      ctx.fillText('ACTUALLY SHIPS.', xPos, lineHeight * 2);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const newParticles: Particle[] = [];
      const gap = isMobile ? 2 : 3;
      
      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const index = (y * canvas.width + x) * 4;
          const alpha = pixels[index + 3];
          if (alpha > 128) {
             const r = pixels[index];
             const g = pixels[index+1];
             const b = pixels[index+2];
             const color = `rgba(${r},${g},${b},${alpha/255})`;
             newParticles.push(new Particle(x, y, color));
          }
        }
      }
      
      particles = newParticles;
      isInit = true;
    };
    
    // We delay init slightly to ensure font is loaded
    setTimeout(() => {
        if(document.fonts) {
            document.fonts.ready.then(init);
        } else {
            init();
        }
    }, 100);
    
    const animate = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      if (isInit) {
          particles.forEach(p => {
            p.update();
            p.draw(ctx!);
          });
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };
    
    // Adjust mouse tracking to document to trigger hovering accurately over bounding rect
    const onDocMove = (e: globalThis.MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const padding = 50;
        if (
            e.clientX >= rect.left - padding &&
            e.clientX <= rect.right + padding &&
            e.clientY >= rect.top - padding &&
            e.clientY <= rect.bottom + padding
        ) {
            isHovering = true;
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        } else {
            isHovering = false;
        }
    }
    
    let resizeTimer: any;
    const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(init, 200);
    };

    const handleClick = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        particles.forEach(p => {
            const dx = p.x - clickX;
            const dy = p.y - clickY;
            const distance = Math.sqrt(dx * dx + dy * dy) || 1;
            
            // Explosion impulse pushing outwards from the cursor click point
            const force = Math.max(0, 600 / (distance + 40));
            p.vx += (dx / distance) * force * (15 + Math.random() * 25);
            p.vy += (dy / distance) * force * (15 + Math.random() * 25);
        });

        if (onClick) {
            setTimeout(onClick, 1400);
        }
    };
    
    document.addEventListener('mousemove', onDocMove);
    window.addEventListener('resize', handleResize);
    container.addEventListener('click', handleClick);
    
    return () => {
        cancelAnimationFrame(animationFrameId);
        document.removeEventListener('mousemove', onDocMove);
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full cursor-pointer select-none">
      <div className="opacity-0 pointer-events-none font-display font-bold text-[56px] lg:text-[72px] leading-[0.85] tracking-tighter flex flex-col uppercase pb-4 items-center text-center lg:items-start lg:text-left">
         <span className="pb-1">We build</span>
         <span className="pb-1">software that</span>
         <span className="pb-1">actually ships.</span>
      </div>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none" 
      />
    </div>
  );
};
