import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const Interactive3DContainer = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y * 0.15); 
    setRotateY(x * 0.15);
  };

  return (
    <div 
      className={`relative flex items-center justify-center min-h-[150px] cursor-crosshair ${className}`} 
      style={{ perspective: 1200 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotateX(0); setRotateY(0); }}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        animate={{ 
          rotateX: isHovered ? rotateX : 20, 
          rotateY: isHovered ? rotateY : -20,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative will-change-transform flex items-center justify-center w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export const WireframeHeroLayered = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center w-full h-[300px] md:h-[400px] ${className}`} style={{ perspective: 1400 }}>
      <motion.div
        animate={{ rotateX: [50, 55, 50], rotateZ: [-30, -35, -30] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-[200px] h-[200px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Core pillar */}
        <div className="absolute inset-x-8 -inset-y-20 border border-[var(--wireframe-stroke)]/30 rounded-full bg-[var(--wireframe-fill-1)]/5" />
        
        {/* Multi-layered rings */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            animate={{ z: [i * 30 - 50, i * 40 - 50, i * 30 - 50] }}
            transition={{ duration: 8, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 border border-[var(--primary)]/20 rounded-full"
            style={{ backdropFilter: 'blur(4px)' }}
          >
            {i % 2 === 0 && (
              <motion.div 
                 animate={{ rotateZ: 360 }}
                 transition={{ duration: 20 + i * 2, repeat: Infinity, ease: 'linear' }}
                 className="w-full h-full border-t border-[var(--primary)] rounded-full opacity-50"
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export const WireframeBrowser = () => (
    <Interactive3DContainer className="h-[80px] w-auto mb-6">
        <motion.div 
            animate={{ y: [-5, 5, -5] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-[80px] h-[60px] border border-[var(--wireframe-stroke)] rounded-[4px] bg-[var(--wireframe-fill-2)] backdrop-blur-sm shadow-xl flex flex-col overflow-hidden"
        >
            <div className="h-[12px] border-b border-[var(--wireframe-stroke)] flex items-center px-1 gap-[2px]">
                <div className="w-[4px] h-[4px] rounded-full bg-[var(--primary)]/20" />
                <div className="w-[4px] h-[4px] rounded-full bg-[var(--primary)]/20" />
                <div className="w-[4px] h-[4px] rounded-full bg-[var(--primary)]/20" />
            </div>
            <div className="flex-1 p-2 flex flex-col gap-1">
                <div className="w-2/3 h-[4px] rounded-full bg-[var(--primary)]/10" />
                <div className="w-1/2 h-[4px] rounded-full bg-[var(--primary)]/10" />
                <motion.div animate={{ width: ['30%', '80%', '30%'] }} transition={{ duration: 5, repeat: Infinity }} className="h-[2px] rounded-full bg-[var(--primary)]/30 mt-auto" />
            </div>
        </motion.div>
    </Interactive3DContainer>
);

export const WireframePhone = ({ className = '' }: { className?: string }) => {
  return (
    <Interactive3DContainer className={`mb-6 flex justify-center items-center ${className}`}>
      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        {/* Phone Outer Chassis */}
        <motion.div 
            animate={{ y: [-4, 4, -4] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[110px] h-[190px] rounded-[18px] border-[1.5px] border-[var(--primary)] bg-[var(--bg)]/95 shadow-2xl relative p-[6px] overflow-hidden flex flex-col justify-between"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Speaker ear piece and notch */}
            <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[36px] h-[10px] bg-[var(--bg)] border border-[var(--primary)]/50 rounded-full flex items-center justify-center z-10">
              <div className="w-[3px] h-[3px] rounded-full bg-[var(--primary)] animate-pulse" />
            </div>

            {/* Inner Interactive Feed items */}
            <div className="flex-1 mt-6 flex flex-col gap-[6px] overflow-hidden">
              {[0, 1, 2, 3].map((i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0.1 }}
                  animate={{ opacity: [0.3, 1, 0.3], y: [i * 3, i * 3 - 2, i * 3] }}
                  transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                  className="border border-[var(--primary)]/30 rounded-[6px] p-[5px] flex items-center gap-[4px] bg-[var(--bg)]/60"
                >
                  {/* Circular indicator */}
                  <span className="w-[6px] h-[6px] rounded-full bg-[var(--primary)] shrink-0 opacity-70" />
                  {/* Content bar */}
                  <div className="flex-1 flex flex-col gap-[3px]">
                    <div className="w-[45%] h-[3px] bg-[var(--primary)]/40 rounded-[1px]" />
                    <div className="w-[85%] h-[2px] bg-[var(--primary)]/20 rounded-[0.5px]" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom navigation line indicator */}
            <div className="h-[2px] w-[35%] bg-[var(--primary)]/50 mx-auto mt-1 rounded-full shrink-0" />
        </motion.div>
      </div>
    </Interactive3DContainer>
  )
};

export const WireframeServer = ({ className = '' }: { className?: string }) => (
    <Interactive3DContainer className={`mb-6 ${className}`}>
        <div className="flex flex-col gap-2 relative w-[80px]">
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    animate={{ x: [0, i % 2 === 0 ? 5 : -5, 0] }}
                    transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    className="h-[20px] border border-[var(--wireframe-stroke)] bg-[var(--wireframe-fill-2)]/60 backdrop-blur rounded-[2px] flex items-center justify-between px-2"
                >
                    <div className="flex gap-1">
                        <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1 + i, repeat: Infinity }} className="w-[4px] h-[4px] rounded-full bg-cyan-400/50" />
                        <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5 + i, repeat: Infinity }} className="w-[4px] h-[4px] rounded-full bg-green-400/50" />
                    </div>
                </motion.div>
            ))}
        </div>
    </Interactive3DContainer>
);

export const WireframeBoxes = ({ className = '' }: { className?: string }) => (
    <Interactive3DContainer className={`mb-6 ${className}`}>
       <motion.div animate={{ rotateZ: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="relative w-[80px] h-[80px]">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-0 border border-[var(--primary)]/30 rotate-45 rounded-[4px]" />
          <motion.div animate={{ scale: [1.2, 1, 1.2] }} transition={{ duration: 4, repeat: Infinity }} className="absolute inset-2 border border-[var(--primary)]/50 rounded-[4px]" />
       </motion.div>
    </Interactive3DContainer>
);

export const WireframeChart = ({ className = '' }: { className?: string }) => (
    <Interactive3DContainer className={`mb-6 ${className}`}>
        <div className="flex items-end gap-1 h-[60px] w-[80px]">
            {[0, 1, 2, 3, 4].map((i) => (
                <motion.div 
                    key={i}
                    animate={{ height: ['20%', '100%', '20%'] }}
                    transition={{ duration: 3, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full bg-[var(--primary)]/20 border-t border-[var(--primary)] rounded-t-[2px]"
                />
            ))}
        </div>
    </Interactive3DContainer>
);

export const WireframeNodes = ({ className = '' }: { className?: string }) => (
    <Interactive3DContainer className={`mb-6 ${className}`}>
       <motion.div animate={{ rotateZ: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="relative w-[100px] h-[100px]">
          {[0, 120, 240].map((deg, i) => (
              <motion.div 
                  key={deg} 
                  className="absolute top-1/2 left-1/2 w-[4px] h-[40px] rounded-full bg-[var(--primary)]/20 origin-top"
                  style={{ transform: `rotate(${deg}deg)` }}
              >
                  <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, delay: i, repeat: Infinity }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[12px] h-[12px] rounded-full border border-[var(--primary)]/50 bg-[var(--bg)]" />
              </motion.div>
          ))}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[16px] h-[16px] rounded-full bg-[var(--primary)]/80" />
       </motion.div>
    </Interactive3DContainer>
);

export const WireframeLinearStack = ({ className = '' }: { className?: string }) => {
  return (
    <Interactive3DContainer className={`mb-6 flex justify-center items-center ${className}`}>
      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        {/* Web Browser Frame */}
        <motion.div 
            animate={{ y: [4, -4, 4] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[190px] h-[120px] rounded-[8px] border-[1.5px] border-[var(--primary)] bg-[var(--bg)]/95 shadow-2xl relative p-2 overflow-hidden flex flex-col gap-2"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Toolbar Header Row */}
            <div className="flex justify-between items-center border-b border-[var(--primary)]/30 pb-2">
              <div className="flex gap-[3px]">
                <span className="w-[5px] h-[5px] rounded-full border border-[var(--primary)]/60" />
                <span className="w-[5px] h-[5px] rounded-full border border-[var(--primary)]/60" />
                <span className="w-[5px] h-[5px] rounded-full border border-[var(--primary)]/60" />
              </div>
              {/* Dotted address bar */}
              <div className="w-[70%] h-[7px] border border-[var(--primary)]/30 rounded-[2px] flex items-center justify-start px-1">
                <div className="w-[40%] h-[2px] bg-[var(--primary)]/20" />
              </div>
            </div>

            {/* Main UI body workspace */}
            <div className="flex-1 flex gap-[6px]">
              {/* Lateral sidebar schema */}
              <div className="w-[20%] border-r border-[var(--primary)]/20 flex flex-col gap-[3px] pr-1">
                <div className="w-full h-[3px] bg-[var(--primary)]/40 rounded-[0.5px]" />
                <div className="w-4/5 h-[2px] bg-[var(--primary)]/20 rounded-[0.5px]" />
                <div className="w-3/4 h-[2px] bg-[var(--primary)]/20 rounded-[0.5px]" />
              </div>

              {/* Central main dashboards area */}
              <div className="flex-1 flex flex-col gap-[4px]">
                <div className="grid grid-cols-2 gap-1.5 flex-1">
                  {/* Dashboard widget cards */}
                  <div className="border border-[var(--primary)]/20 rounded-[3px] p-[3px] flex flex-col justify-between">
                    <span className="w-[60%] h-[2px] bg-[var(--primary)]/30" />
                    <div className="flex items-end gap-[1px] h-[10px]">
                      <div className="w-1/3 h-[40%] bg-[var(--primary)]/30" />
                      <div className="w-1/3 h-[90%] bg-[var(--primary)]/50 animate-pulse" />
                      <div className="w-1/3 h-[60%] bg-[var(--primary)]/40" />
                    </div>
                  </div>
                  <div className="border border-[var(--primary)]/20 rounded-[3px] p-[3px] flex flex-col justify-end">
                    {/* Activity indicator bar chart */}
                    <div className="w-full bg-[var(--primary)]/10 h-[4px] rounded-[1px] relative overflow-hidden">
                      <motion.div 
                        animate={{ left: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-0 bottom-0 w-1/3 bg-[var(--primary)]" 
                      />
                    </div>
                  </div>
                </div>
                {/* Full-width status message bar */}
                <div className="h-[12px] border border-[var(--primary)]/20 rounded-[2px] px-1 flex items-center justify-between">
                  <span className="w-[50%] h-[2px] bg-[var(--primary)]/30" />
                  <span className="w-[15%] h-[2px] bg-[var(--primary)]/60 animate-pulse" />
                </div>
              </div>
            </div>
        </motion.div>
      </div>
    </Interactive3DContainer>
  )
};

export const WireframeLinearCubes = ({ className = '' }: { className?: string }) => {
  return (
    <Interactive3DContainer className={`mb-6 flex justify-center items-center ${className}`}>
      <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
        {/* Layered server architecture components */}
        <div className="flex flex-col gap-4 relative w-[160px] h-[130px] justify-center items-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.8 }}
              animate={{ 
                y: [0, i % 2 === 0 ? 3 : -3, 0],
                rotateX: [12, 12, 12]
              }}
              style={{ 
                transform: 'perspective(400px) rotateX(25deg)',
                transformStyle: 'preserve-3d' 
              }}
              transition={{ duration: 5, delay: i * 0.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-[110px] h-[22px] border-[1.2px] border-[var(--primary)] bg-[var(--bg)]/90 shadow-lg rounded-[4px] flex items-center justify-between px-2 relative"
            >
              {/* Connection dots */}
              <div className="flex items-center gap-[4px] h-full">
                <motion.div animate={{ opacity: [1, 0.1, 1] }} transition={{ duration: 1.2 + i * 0.3, repeat: Infinity }} className="w-[4px] h-[4px] rounded-full bg-[var(--primary)]" />
                <div className="w-[15px] h-[2px] bg-[var(--primary)]/30" />
              </div>

              {/* Server details */}
              <div className="flex items-center gap-1">
                <div className="w-[10px] h-[5px] border border-[var(--primary)]/30 rounded-[1px]" />
                <div className="w-[10px] h-[5px] border border-[var(--primary)]/30 rounded-[1px]" />
                <span className="w-[3px] h-[3px] rounded-full bg-[var(--primary)] animate-pulse" />
              </div>

              {/* Connecting conduits / data pulses */}
              {i < 2 && (
                <div className="absolute left-[20px] top-[20px] w-[1.5px] h-[18px] bg-[var(--primary)]/35 pointer-events-none">
                  <motion.div 
                    animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[var(--primary)]"
                  />
                </div>
              )}
              {i < 2 && (
                <div className="absolute right-[20px] top-[20px] w-[1.5px] h-[18px] bg-[var(--primary)]/35 pointer-events-none">
                  <motion.div 
                    animate={{ top: ['100%', '0%'], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-[var(--primary)]"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Interactive3DContainer>
  )
};

export const WireframeLinearPanels = ({ className = '' }: { className?: string }) => (
    <Interactive3DContainer className={className}>
        <div className="relative w-[120px] h-[80px]" style={{ transformStyle: 'preserve-3d' }}>
            {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                    key={i}
                    animate={{ rotateY: [0, 20, 0] }}
                    transition={{ duration: 4, delay: i * 0.1, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-y-0 border-l border-t border-[var(--primary)]/20 bg-[var(--bg)]/10 backdrop-blur shadow-md"
                    style={{ width: '40px', left: `${i * 15}px`, zIndex: 10 - i }}
                />
            ))}
        </div>
    </Interactive3DContainer>
);

export const WireframeNetworkNode = ({ className = '' }: { className?: string }) => (
    <Interactive3DContainer className={`mb-6 ${className}`}>
        <motion.div animate={{ rotateZ: 180 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="relative w-[80px] h-[80px]">
            <motion.div animate={{ borderStyle: ['dotted', 'dashed', 'dotted'] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 border-[2px] border-[var(--primary)]/20 rounded-full" />
            <motion.div className="absolute inset-4 border border-[var(--primary)]/40 rounded-full flex items-center justify-center">
                <div className="w-[10px] h-[10px] bg-[var(--primary)] rounded-full animate-pulse" />
            </motion.div>
        </motion.div>
    </Interactive3DContainer>
);

export const WireframeCube = ({ className = '' }: { className?: string }) => (
    <Interactive3DContainer className={`mb-6 ${className}`}>
        <motion.div animate={{ rotateX: [0, 45, 90, 180], rotateY: [0, 90, 180, 360] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-[60px] h-[60px] relative" style={{ transformStyle: 'preserve-3d' }}>
             <div className="absolute inset-0 border border-[var(--primary)]/30 backdrop-blur-[2px]" style={{ transform: 'translateZ(30px)' }} />
             <div className="absolute inset-0 border border-[var(--primary)]/30 backdrop-blur-[2px]" style={{ transform: 'translateZ(-30px)' }} />
             <div className="absolute inset-0 border border-[var(--primary)]/30 backdrop-blur-[2px]" style={{ transform: 'rotateY(90deg) translateZ(30px)' }} />
             <div className="absolute inset-0 border border-[var(--primary)]/30 backdrop-blur-[2px]" style={{ transform: 'rotateY(90deg) translateZ(-30px)' }} />
             <div className="absolute inset-0 bg-[var(--primary)]/10" style={{ transform: 'rotateX(90deg) translateZ(30px)' }} />
             <div className="absolute inset-0 bg-[var(--primary)]/10" style={{ transform: 'rotateX(90deg) translateZ(-30px)' }} />
        </motion.div>
    </Interactive3DContainer>
);

export const Wireframe3DEnterprise = ({ className = '' }: { className?: string }) => {
  return (
    <Interactive3DContainer className={className}>
        <div className="relative w-[140px] h-[140px]" style={{ transformStyle: 'preserve-3d' }}>
            <motion.div animate={{ rotateZ: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-current/20 rounded-full border-dashed" />
            <div className="absolute inset-[15%] bg-current/5 backdrop-blur-md rounded-full border border-current/10 shadow-2xl flex items-center justify-center">
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 4, repeat: Infinity }} className="w-1/3 h-1/3 bg-current/30 rounded-full blur-md" />
            </div>
            {/* Orbiting element */}
            <motion.div 
               animate={{ rotateZ: 360 }} 
               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 origin-center"
            >
                <div className="absolute -top-[4px] left-1/2 -translate-x-1/2 w-[8px] h-[8px] bg-current rounded-full drop-shadow-md" />
            </motion.div>
        </div>
    </Interactive3DContainer>
  )
};

export const Wireframe3DChart = ({ className = '' }: { className?: string }) => {
  return (
    <Interactive3DContainer className={className}>
        <div className="relative w-[120px] h-[100px] flex items-end justify-between px-2" style={{ transformStyle: 'preserve-3d' }}>
            {[1, 3, 2, 4, 3, 5].map((val, i) => (
                <motion.div 
                    key={i}
                    animate={{ height: [`${val * 10}%`, `${val * 20}%`, `${val * 10}%`] }}
                    transition={{ duration: 4, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-[12px] bg-gradient-to-t from-[var(--primary)]/5 to-[var(--primary)]/40 border border-[var(--primary)]/30 rounded-t-[2px] relative"
                >
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-[var(--primary)]" />
                </motion.div>
            ))}
            <div className="absolute bottom-0 inset-x-0 h-[100px] border-b border-l border-[var(--primary)]/20" style={{ transform: 'skewX(-20deg) rotateX(45deg)' }} />
        </div>
    </Interactive3DContainer>
  )
};

export const Wireframe3DNodes = ({ className = '' }: { className?: string }) => {
  return (
    <Interactive3DContainer className={className}>
        <motion.div 
            animate={{ rotateY: 360 }} 
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative w-[120px] h-[120px]"
            style={{ transformStyle: 'preserve-3d' }}
        >
            <div className="absolute inset-0 border border-[var(--primary)]/20 rounded-full" style={{ transform: 'rotateX(75deg)' }} />
            <div className="absolute inset-0 border border-[var(--primary)]/20 rounded-full" style={{ transform: 'rotateY(75deg)' }} />
            
            <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[24px] h-[24px] bg-[var(--primary)]/20 rounded-full blur flex items-center justify-center">
                <div className="w-[8px] h-[8px] bg-[var(--primary)] rounded-full" />
            </motion.div>

            {/* Orbiters */}
            <motion.div animate={{ rotateZ: 360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute inset-0" style={{ transform: 'rotateX(75deg)' }}>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-[var(--primary)] rounded-full" />
            </motion.div>
            <motion.div animate={{ rotateZ: -360 }} transition={{ duration: 7, repeat: Infinity, ease: "linear" }} className="absolute inset-0" style={{ transform: 'rotateY(75deg)' }}>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-[var(--primary)] rounded-full border border-[var(--bg)]" />
            </motion.div>
        </motion.div>
    </Interactive3DContainer>
  )
};

export const WireframeSVGStack = ({ className = '' }: { className?: string }) => {
  return (
      <motion.svg 
          className={className}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
          width="400" height="400" viewBox="0 0 400 400" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
      >
          <g stroke="var(--primary)" strokeOpacity="0.4" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round">
              {/* Layer 1 (Bottom) */}
              <path d="M 200 340 L 340 270 L 200 200 L 60 270 Z" />
              
              {/* Vertical connections for Layer 1 to 2 */}
              <path d="M 60 270 L 60 210" strokeDasharray="4 4" />
              <path d="M 340 270 L 340 210" strokeDasharray="4 4" />
              <path d="M 200 340 L 200 280" strokeDasharray="4 4" />
              <path d="M 200 200 L 200 140" strokeDasharray="4 4" />

              {/* Layer 2 (Middle) */}
              <path d="M 200 280 L 340 210 L 200 140 L 60 210 Z" />
              
              {/* Vertical connections for Layer 2 to 3 */}
              <path d="M 60 210 L 60 150" strokeDasharray="4 4" />
              <path d="M 340 210 L 340 150" strokeDasharray="4 4" />
              <path d="M 200 280 L 200 220" strokeDasharray="4 4" />
              <path d="M 200 140 L 200 80" strokeDasharray="4 4" />

              {/* Layer 3 (Top) */}
              <path d="M 200 220 L 340 150 L 200 80 L 60 150 Z" />

              {/* Some inner geometry on the top layer to make it look like a wireframe layout */}
              <path d="M 90 165 L 140 190" />
              <path d="M 110 155 L 200 200" />
              <path d="M 130 145 L 240 200" />
              <path d="M 150 135 L 280 200" />
              
              {/* Inner box on top layer */}
              <path d="M 200 110 L 290 155 L 200 200 L 110 155 Z" />
              <path d="M 200 130 L 250 155 L 200 180 L 150 155 Z" />
          </g>
      </motion.svg>
  )
};


export const WireframeSVGEnterpriseStack = ({ className = '' }: { className?: string }) => {
  return (
      <motion.svg 
          className={className}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay: 0 }}
          width="200" height="200" viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
      >
          <g stroke="var(--primary)" strokeOpacity="0.4" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round">
            {/* Box 1 (Bottom) */}
            <path d="M 100 170 L 160 140 L 100 110 L 40 140 Z" />
            <path d="M 40 140 L 40 160 L 100 190 L 160 160 L 160 140" />
            <path d="M 100 170 L 100 190" />
            
            {/* Box 2 (Middle) */}
            <path d="M 100 120 L 150 95 L 100 70 L 50 95 Z" />
            <path d="M 50 95 L 50 115 L 100 140 L 150 115 L 150 95" />
            <path d="M 100 120 L 100 140" />
            
            {/* Box 3 (Top) */}
            <path d="M 100 75 L 130 60 L 100 45 L 70 60 Z" />
            <path d="M 70 60 L 70 80 L 100 95 L 130 80 L 130 60" />
            <path d="M 100 75 L 100 95" />
          </g>
      </motion.svg>
  )
};

export const WireframeSVGChart = ({ className = '' }: { className?: string }) => {
  return (
      <motion.svg 
          className={className}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}
          width="200" height="200" viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
      >
          <g stroke="var(--primary)" strokeOpacity="0.4" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round">
            {/* Base planes representing x/y/z axes */}
            <path d="M 100 170 L 180 130 L 100 90 L 20 130 Z" />
            {/* Grid lines */}
            <path d="M 40 120 L 120 80" strokeDasharray="3 3"/>
            <path d="M 60 110 L 140 70" strokeDasharray="3 3"/>
            <path d="M 80 100 L 160 60" strokeDasharray="3 3"/>
            
            <path d="M 120 160 L 40 120" strokeDasharray="3 3"/>
            <path d="M 140 150 L 60 110" strokeDasharray="3 3"/>
            <path d="M 160 140 L 80 100" strokeDasharray="3 3"/>
            
            {/* Bar 1 (Left) */}
            <path d="M 60 120 L 80 110 L 100 120 L 80 130 Z" />
            <path d="M 60 120 L 60 80 L 80 70 L 100 80 L 100 120" />
            <path d="M 80 110 L 80 70" />

            {/* Bar 2 (Middle, Tall) */}
            <path d="M 100 140 L 120 130 L 140 140 L 120 150 Z" />
            <path d="M 100 140 L 100 50 L 120 40 L 140 50 L 140 140" />
            <path d="M 120 130 L 120 40" />

            {/* Bar 3 (Right) */}
            <path d="M 140 120 L 160 110 L 180 120 L 160 130 Z" />
            <path d="M 140 120 L 140 90 L 160 80 L 180 90 L 180 120" />
            <path d="M 160 110 L 160 80" />
          </g>
      </motion.svg>
  )
};

export const WireframeSVGNetwork = ({ className = '' }: { className?: string }) => {
  return (
      <motion.svg 
          className={className}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, delay: 1 }}
          width="200" height="200" viewBox="0 0 200 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
      >
          <g stroke="var(--primary)" strokeOpacity="0.4" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round">
            {/* Center Node */}
            <circle cx="100" cy="100" r="4" fill="transparent" />
            <circle cx="100" cy="100" r="12" strokeDasharray="2 2" />
            
            {/* Node 1 Top */}
            <circle cx="100" cy="40" r="6" />
            <path d="M 100 88 L 100 46" />

            {/* Node 2 Top Right */}
            <circle cx="160" cy="70" r="5" />
            <path d="M 110 95 L 155 72" />
            <path d="M 160 65 L 100 35" strokeDasharray="3 3" />

            {/* Node 3 Bottom Right */}
            <circle cx="140" cy="140" r="8" />
            <path d="M 108 108 L 132 136" />
            <path d="M 155 75 L 145 135" strokeDasharray="3 3"/>

            {/* Node 4 Bottom */}
            <circle cx="90" cy="160" r="6" />
            <path d="M 98 110 L 92 154" />
            <path d="M 132 144 L 96 158" strokeDasharray="3 3" />

            {/* Node 5 Bottom Left */}
            <circle cx="40" cy="120" r="7" />
            <path d="M 92 104 L 47 118" />
            <path d="M 84 160 L 44 126" strokeDasharray="3 3"/>

            {/* Node 6 Top Left */}
            <circle cx="50" cy="60" r="4" />
            <path d="M 92 94 L 54 62" />
            <path d="M 40 113 L 48 64" strokeDasharray="3 3"/>
            <path d="M 54 58 L 94 42" strokeDasharray="3 3"/>
            
            {/* Cross connections */}
            <path d="M 55 65 L 155 70" strokeDasharray="2 4" opacity="0.5"/>
            <path d="M 135 135 L 50 65" strokeDasharray="2 4" opacity="0.5"/>
          </g>
      </motion.svg>
  )
};
