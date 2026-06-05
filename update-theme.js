const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace bg-[var(--primary)] text-black with bg-[var(--bg)] text-[var(--primary)]
content = content.replace(/bg-\[var\(--primary\)\]/g, 'bg-[var(--bg)]');
content = content.replace(/text-black/g, 'text-[var(--primary)]');
content = content.replace(/bg-black/g, 'bg-[var(--bg)]');
content = content.replace(/border-black/g, 'border-[var(--border)]');

fs.writeFileSync('src/App.tsx', content);
