const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const heroRegex = /<div className="lg:col-span-7">[\s\S]*?<LiveTerminal \/>\s*<\/motion\.div>\s*<\/div>\s*<div className="lg:col-span-5 flex justify-center lg:justify-end items-center">\s*<motion\.div[^>]*>\s*<WireframeSVGStack \/>\s*<\/motion\.div>\s*<\/div>/;

const newHTML = `<div className="lg:col-span-7 flex flex-col justify-center">
          <h1 className="font-display font-bold text-[56px] md:text-[84px] leading-[0.85] tracking-tighter text-[var(--primary)] mb-6 flex flex-col uppercase">
            <span className="overflow-hidden pb-2"><motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}>We build</motion.span></span>
            <span className="overflow-hidden pb-2"><motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}>software that</motion.span></span>
            <span className="overflow-hidden pb-2 text-[var(--primary)]/70"><motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}>actually ships.</motion.span></span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
            className="font-body text-[18px] font-bold text-[var(--primary)]/80 leading-[1.6] max-w-[500px] mb-10"
          >
            High-performance engineering for ambitious teams. We bridge the gap
            between complex architecture and commercial reality with technical
            precision.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <button onClick={onBookCall} className="bg-[var(--bg)] text-[var(--primary)] font-display text-[14px] font-bold tracking-[0.1em] uppercase px-[32px] py-[16px] rounded-none transition-all hover:bg-[var(--primary)] hover:text-[var(--bg)] border-2 border-[var(--primary)] hover:scale-[1.02] active:scale-[0.98]">
              Assemble Team
            </button>
            <button className="bg-transparent text-[var(--primary)] border-2 border-[var(--primary)] font-display text-[14px] font-bold tracking-[0.1em] uppercase px-[32px] py-[16px] rounded-none transition-all hover:bg-[var(--primary)] hover:text-[var(--bg)] active:scale-[0.98]">
              View Specs
            </button>
          </motion.div>
        </div>
        <div className="lg:col-span-5 flex justify-center lg:justify-end items-center mt-10 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="w-full max-w-[500px] flex items-center justify-center relative pointer-events-auto"
          >
            <LiveTerminal />
          </motion.div>
        </div>`;

if(heroRegex.test(code)) {
    code = code.replace(heroRegex, newHTML);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Replaced successfully")
} else {
    console.log("Regex not found. Writing out a debug file to see what it is");
    fs.writeFileSync('hero_debug.txt', code);
}
