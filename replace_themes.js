import fs from 'fs';
let app = fs.readFileSync('src/App.tsx', 'utf-8');

app = app.replace(/bg-\[\#0b0b0b\]/g, 'bg-[var(--bg)]');
app = app.replace(/text-\[\#F5F5F5\]/g, 'text-[var(--primary)]');
app = app.replace(/border-\[rgba\(255,255,255,0\.05\)\]/g, 'border-[var(--border)]');
app = app.replace(/border-\[rgba\(255,255,255,0\.04\)\]/g, 'border-[var(--border)]');
app = app.replace(/border-\[rgba\(255,255,255,0\.08\)\]/g, 'border-[var(--border)]');
app = app.replace(/border-\[rgba\(255,255,255,0\.1\)\]/g, 'border-[var(--border)]');
app = app.replace(/border-\[rgba\(255,255,255,0\.15\)\]/g, 'border-[var(--border-light)]');
app = app.replace(/text-\[\#888\]/g, 'text-[var(--body)]');
app = app.replace(/text-\[\#888888\]/g, 'text-[var(--body)]');
app = app.replace(/text-\[\#aaa\]/g, 'text-[var(--secondary)]');
app = app.replace(/text-\[\#444\]/g, 'text-[var(--secondary)]');
app = app.replace(/bg-\[rgba\(255,255,255,0\.015\)\]/g, 'bg-[var(--hover-bg)]');
app = app.replace(/bg-\[rgba\(255,255,255,0\.02\)\]/g, 'bg-[var(--hover-bg)]');
app = app.replace(/hover:bg-\[rgba\(255,255,255,0\.015\)\]/g, 'hover:bg-[var(--hover-bg)]');
app = app.replace(/bg-\[rgba\(255,255,255,0\.03\)\]/g, 'bg-[var(--border)]');
app = app.replace(/bg-\[\#1a1a1a\]/g, 'bg-[var(--surface)]');
app = app.replace(/hover:bg-\[\#1a1a1a\]/g, 'hover:bg-[var(--surface)]');

fs.writeFileSync('src/App.tsx', app);
