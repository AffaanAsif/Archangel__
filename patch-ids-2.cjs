const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

let sectionCount = 0;
const ids = ['hero', 'manifesto', 'scope', 'pipeline', 'capabilities', 'contact'];

code = code.replace(/<motion\.section/g, (match) => {
    const id = ids[sectionCount] || `section-${sectionCount}`;
    sectionCount++;
    return `<motion.section id="${id}"`;
});

fs.writeFileSync('src/App.tsx', code);
