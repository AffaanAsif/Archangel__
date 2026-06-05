const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Add import
if (!code.includes('import { TabScrollNav }')) {
    code = code.replace(
        'import { LiveTerminal }',
        'import { TabScrollNav } from "./components/TabScrollNav";\nimport { LiveTerminal }'
    );
}

// Add to the main function return
const mainReturn = /(<Navbar onBookCall={openModal} \/>)/;
code = code.replace(mainReturn, '<TabScrollNav />\n        $1');

// Inject IDs into the sections
const sectionsToId = [
    { search: '<motion.section className="relative bg-\\[var\\(--bg\\)\\] text-\\[var\\(--primary\\)\\] pt-\\[120px\\]', id: 'hero' },
    { search: '<motion.section className="relative bg-\\[var\\(--bg\\)\\] text-\\[var\\(--primary\\)\\] py-\\[120px\\] w-full border-t-4 border-\\[var\\(--border\\)\\]"', id: 'manifesto' },
    { search: '<motion.section className="bg-\\[var\\(--bg\\)\\] text-\\[var\\(--primary\\)\\] py-\\[80px\\] md:py-\\[120px\\] w-full"', id: 'scope' },
    { search: '<motion.section className="bg-\\[var\\(--bg\\)\\] text-\\[var\\(--primary\\)\\] py-\\[120px\\] max-w-\\[1200px\\] mx-auto w-full px-6 border-t border-\\[var\\(--primary\\)\\]"', id: 'capabilities' },
    { search: '<motion.section className="relative bg-\\[var\\(--bg\\)\\] text-\\[var\\(--primary\\)\\] py-\\[120px\\] w-full border-t border-\\[var\\(--border\\)\\]"', id: 'contact' },
];

sectionsToId.forEach(sec => {
    code = code.replace(sec.search, sec.search.replace('<motion.section ', `<motion.section id="${sec.id}" `));
});

fs.writeFileSync('src/App.tsx', code);
