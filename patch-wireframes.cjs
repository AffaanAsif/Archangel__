const fs = require('fs');
let code = fs.readFileSync('src/components/Wireframe.tsx', 'utf-8');

const newComponents = `
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
          <g stroke="rgba(255,255,255,0.13)" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round">
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
          <g stroke="rgba(255,255,255,0.13)" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round">
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
          <g stroke="rgba(255,255,255,0.13)" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round">
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
`;

fs.writeFileSync('src/components/Wireframe.tsx', code + '\n' + newComponents);
