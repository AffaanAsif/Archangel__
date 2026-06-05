const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Import motion
if (!code.includes('import { LiveTerminal }')) {
    code = code.replace(
        'import {',
        'import { LiveTerminal } from "./components/LiveTerminal";\nimport {'
    );
}

// Update section tags to have motion blur effects
const sectionRegex = /<section\b([^>]*)>/g;
code = code.replace(sectionRegex, (match, p1) => {
    // If it already has motion props or ref, we handle carefully, but we know our sections
    // Wait, one of them has ref={sectionRef}
    if (p1.includes('ref=')) {
        return `<motion.section ${p1} \n        initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}\n        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}\n        viewport={{ once: true, margin: "-10%" }}\n        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>`;
    }
    return `<motion.section ${p1} \n      initial={{ opacity: 0, filter: "blur(8px)", y: 30 }}\n      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}\n      viewport={{ once: true, margin: "-10%" }}\n      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>`;
});

// Since we replaced <section> with <motion.section>, we need to replace </section> with </motion.section>
code = code.replace(/<\/section>/g, '</motion.section>');

// Insert LiveTerminal in Hero
const heroDivRegex = /(<motion\.div\s+initial={{ opacity: 0, scale: 0\.95 }}[^>]*>)/;
// Wait, we can put it below the CTA buttons in Hero
const heroButtons = /<button className="bg-transparent text-\[var\(--bg\)\][^>]*>\s*View Specs\s*<\/button>\s*<\/motion\.div>/;
code = code.replace(heroButtons, match => {
  return match + `\n          <motion.div\n            initial={{ opacity: 0, y: 30 }}\n            animate={{ opacity: 1, y: 0 }}\n            transition={{ duration: 1, delay: 0.5 }}\n          >\n            <LiveTerminal />\n          </motion.div>`;
});

fs.writeFileSync('src/App.tsx', code);
