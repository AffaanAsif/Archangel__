const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  /Wireframe3DEnterprise,\n\s*Wireframe3DChart,\n\s*Wireframe3DNodes,/g,
  "WireframeSVGEnterpriseStack,\n  WireframeSVGChart,\n  WireframeSVGNetwork,"
);

code = code.replace(
  /<Wireframe3DEnterprise className="w-full h-full max-w-\[200px\]" \/>/g,
  '<WireframeSVGEnterpriseStack className="w-full h-full max-w-[200px]" />'
);

code = code.replace(
  /<Wireframe3DChart className="w-full h-full max-w-\[200px\]" \/>/g,
  '<WireframeSVGChart className="w-full h-full max-w-[200px]" />'
);

code = code.replace(
  /<Wireframe3DNodes className="w-full h-full max-w-\[200px\]" \/>/g,
  '<WireframeSVGNetwork className="w-full h-full max-w-[200px]" />'
);

fs.writeFileSync('src/App.tsx', code);
