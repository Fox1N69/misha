import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const htmlPath = './out/index.html';
const outDir = './out';

// Read HTML file
let html = readFileSync(htmlPath, 'utf8');

// Find all image src attributes with relative paths
const imageRegex = /src="\/([^"]+\.(png|jpg|jpeg|gif|svg|webp))"/gi;
const matches = [...html.matchAll(imageRegex)];

console.log(`Found ${matches.length} images to inline`);

for (const match of matches) {
    const [fullMatch, imagePath] = match;
    const fullImagePath = join(outDir, imagePath);

    try {
        // Read image file as base64
        const imageBuffer = readFileSync(fullImagePath);
        const mimeType = imagePath.endsWith('.svg') ? 'image/svg+xml' :
            imagePath.endsWith('.png') ? 'image/png' :
                imagePath.endsWith('.jpg') || imagePath.endsWith('.jpeg') ? 'image/jpeg' :
                    imagePath.endsWith('.gif') ? 'image/gif' :
                        imagePath.endsWith('.webp') ? 'image/webp' : 'image/png';

        const base64Data = imageBuffer.toString('base64');
        const dataUri = `data:${mimeType};base64,${base64Data}`;

        // Replace in HTML
        html = html.replace(fullMatch, `src="${dataUri}"`);
        console.log(`Inlined: ${imagePath}`);
    } catch (error) {
        console.log(`Could not inline: ${imagePath} - ${error.message}`);
    }
}

// Write updated HTML
writeFileSync(htmlPath, html);
console.log('Image inlining complete!');
