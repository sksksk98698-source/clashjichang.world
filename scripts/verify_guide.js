import fs from 'fs';

const html = fs.readFileSync('astroarabia/dist/guide/index.html', 'utf8');

// Extract <article>...</article>
const articleMatch = html.match(/<article[\s\S]*?<\/article>/);
const articleHtml = articleMatch ? articleMatch[0] : '';
const plainArticle = articleHtml
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<style[\s\S]*?<\/style>/g, '')
  .replace(/<[^>]+>/g, '');
const chineseChars = (plainArticle.match(/[\u4e00-\u9fa5]/g) || []).length;

// Check all #id anchors referenced in TOC
const idMatches = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
const hashHrefs = [...html.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
const missingAnchors = hashHrefs.filter(h => !idMatches.includes(h));

// Check internal links
const internalLinks = [...new Set([...articleHtml.matchAll(/href="(\/[^"#]*)"/g)].map(m => m[1]))];
const missingRoutes = internalLinks.filter(u => {
  const p = u === '/' ? 'astroarabia/dist/index.html' : 'astroarabia/dist' + u + '/index.html';
  return !fs.existsSync(p);
});

// Create standalone offline-openable review HTML with inlined CSS
const cssMatch = html.match(/href="(\/_astro\/[^"]+\.css)"/);
let offlineHtml = html;
if (cssMatch) {
  const cssContent = fs.readFileSync('astroarabia/dist' + cssMatch[1], 'utf8');
  offlineHtml = offlineHtml.replace(/<link rel="stylesheet" href="\/_astro\/[^"]+\.css">/, '<style>' + cssContent + '</style>');
}
fs.writeFileSync('astroarabia/dist/guide-offline-review.html', offlineHtml);

console.log('Article Pure Chinese Characters:', chineseChars);
console.log('Missing #anchors:', missingAnchors.length, missingAnchors);
console.log('Unique internal links in article:', internalLinks.length, internalLinks);
console.log('Missing internal routes:', missingRoutes.length, missingRoutes);
console.log('Offline review HTML saved: astroarabia/dist/guide-offline-review.html');
