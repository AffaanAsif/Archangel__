const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

if (!code.includes('import { ParticleHeadline }')) {
    code = code.replace(
        'import { LiveTerminal }',
        'import { ParticleHeadline } from "./components/ParticleHeadline";\nimport { LiveTerminal }'
    );
}

const h1Regex = /<h1 className="font-display font-bold text-\[56px\] md:text-\[84px\] leading-\[0\.85\] tracking-tighter text-\[var\(--primary\)\] mb-6 flex flex-col uppercase">[\s\S]*?<\/h1>/;

if(h1Regex.test(code)) {
    code = code.replace(h1Regex, '<ParticleHeadline />');
    fs.writeFileSync('src/App.tsx', code);
    console.log("Replaced successfully");
} else {
    console.log("ReGex not found!");
}
