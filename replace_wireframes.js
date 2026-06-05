import fs from 'fs';
let wireframe = fs.readFileSync('src/components/Wireframe.tsx', 'utf-8');

wireframe = wireframe.replace(/bg-\[\#0b0b0b\]/g, 'bg-[var(--wireframe-fill-1)]');
wireframe = wireframe.replace(/text-\[\#F5F5F5\]/g, 'text-[var(--primary)]');
wireframe = wireframe.replace(/border-\[rgba\(255,255,255,0\.1\)\]/g, 'border-[var(--border)]');
wireframe = wireframe.replace(/text-\[\#888\]/g, 'text-[var(--body)]');
wireframe = wireframe.replace(/text-\[\#666\]/g, 'text-[var(--body)]');
wireframe = wireframe.replace(/fill="#1a1a1a"/g, 'fill="var(--wireframe-fill-3)"');
wireframe = wireframe.replace(/fill="#111"/g, 'fill="var(--wireframe-fill-2)"');
wireframe = wireframe.replace(/fill="#222"/g, 'fill="var(--wireframe-fill-3)"');
wireframe = wireframe.replace(/fill="#080808"/g, 'fill="var(--wireframe-fill-1)"');
wireframe = wireframe.replace(/fill="#050505"/g, 'fill="var(--wireframe-fill-1)"');
wireframe = wireframe.replace(/fill="#0b0b0b"/g, 'fill="var(--wireframe-fill-1)"');
wireframe = wireframe.replace(/fill="#151515"/g, 'fill="var(--wireframe-fill-3)"');
wireframe = wireframe.replace(/fill="#1f1f1f"/g, 'fill="var(--wireframe-fill-3)"');
wireframe = wireframe.replace(/fill="#2a2a2a"/g, 'fill="var(--wireframe-fill-3)"');
wireframe = wireframe.replace(/fill="#181818"/g, 'fill="var(--wireframe-fill-3)"');
wireframe = wireframe.replace(/fill="#0c0c0c"/g, 'fill="var(--wireframe-fill-1)"');
wireframe = wireframe.replace(/fill="#1c1c1c"/g, 'fill="var(--wireframe-fill-3)"');
wireframe = wireframe.replace(/fill="#242424"/g, 'fill="var(--wireframe-fill-3)"');
wireframe = wireframe.replace(/fill="#333"/g, 'fill="var(--wireframe-fill-3)"');

fs.writeFileSync('src/components/Wireframe.tsx', wireframe);
