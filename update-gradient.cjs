const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(/radial-gradient\(black 2px, transparent 2px\)/g, "radial-gradient(rgba(255,255,255,0.1) 2px, transparent 2px)");
content = content.replace(/hover:bg-white/g, "hover:bg-[var(--primary)]");
content = content.replace(/hover:text-black/g, "hover:text-[var(--bg)]");
content = content.replace(/bg-transparent text-black/g, "bg-transparent text-[var(--primary)]");
content = content.replace(/bg-[var(--bg)] text-[var(--primary)]/g, "bg-[var(--bg)] text-[var(--primary)]");
content = content.replace(/ring-black/g, "ring-[var(--primary)]");
content = content.replace(/bg-black\/5/g, "bg-white/5");

fs.writeFileSync('src/App.tsx', content);
