const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const heroGridRegex = /<div className="max-w-\[1200px\] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div className="mt-\[120px\]/;

const newHeroLayout = `<div className="max-w-[1200px] mx-auto w-full flex flex-col items-center text-center relative z-10 pt-[40px]">
        <div className="w-full flex flex-col items-center">
          <ParticleHeadline />
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            className="font-body text-[18px] font-bold text-[var(--primary)]/80 leading-[1.6] max-w-[600px] mb-10 text-center"
          >
            High-performance engineering for ambitious teams. We bridge the gap
            between complex architecture and commercial reality with technical
            precision.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <button onClick={onBookCall} className="bg-[var(--bg)] text-[var(--primary)] font-display text-[14px] font-bold tracking-[0.1em] uppercase px-[32px] py-[16px] rounded-none transition-all hover:bg-[var(--primary)] hover:text-[var(--bg)] border-2 border-[var(--primary)] hover:scale-[1.02] active:scale-[0.98]">
              Assemble Team
            </button>
            <button className="bg-transparent text-[var(--primary)] border-2 border-[var(--primary)] font-display text-[14px] font-bold tracking-[0.1em] uppercase px-[32px] py-[16px] rounded-none transition-all hover:bg-[var(--primary)] hover:text-[var(--bg)] active:scale-[0.98]">
              View Specs
            </button>
          </motion.div>
        </div>
        
        <div className="w-full flex justify-center items-center mt-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full max-w-[600px] flex items-center justify-center relative pointer-events-auto shadow-2xl"
          >
            <LiveTerminal className="w-full" />
          </motion.div>
        </div>
      </div>

      <div className="mt-[120px]`;

if(heroGridRegex.test(code)) {
    code = code.replace(heroGridRegex, newHeroLayout);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Hero layout replaced successfully.");
} else {
    console.log("Could not find Hero Layout regex.");
    fs.writeFileSync('hero_layout_debug.txt', code);
}
