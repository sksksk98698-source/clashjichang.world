import fs from 'fs';

const pages = ['free', 'tools', 'warnings', 'faq'];

for (const page of pages) {
  const htmlPath = `astroarabia/dist/${page}/index.html`;
  const html = fs.readFileSync(htmlPath, 'utf8');

  const articleMatch = html.match(/<article[\s\S]*?<\/article>/);
  const articleHtml = articleMatch ? articleMatch[0] : '';
  const articleWithoutScripts = articleHtml
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '');
  const plainArticle = articleWithoutScripts.replace(/<[^>]+>/g, '');
  const chineseChars = (plainArticle.match(/[\u4e00-\u9fa5]/g) || []).length;

  const idMatches = [...html.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
  const hashHrefs = [...html.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
  const missingAnchors = hashHrefs.filter(h => !idMatches.includes(h));

  const internalLinks = [...new Set([...articleWithoutScripts.matchAll(/href="(\/[^"#]*)"/g)].map(m => m[1]))];
  const missingRoutes = internalLinks.filter(u => {
    if (u.startsWith('/images/')) {
      return !fs.existsSync('astroarabia/dist' + u);
    }
    const p = u === '/' ? 'astroarabia/dist/index.html' : 'astroarabia/dist' + u + '/index.html';
    return !fs.existsSync(p);
  });

  const cssMatch = html.match(/href="(\/_astro\/[^"]+\.css)"/);
  let offlineHtml = html;
  if (cssMatch) {
    const cssContent = fs.readFileSync('astroarabia/dist' + cssMatch[1], 'utf8');
    offlineHtml = offlineHtml.replace(/<link rel="stylesheet" href="\/_astro\/[^"]+\.css">/, '<style>' + cssContent + '</style>');
  }
  const outReview = `astroarabia/dist/${page}-offline-review.html`;
  fs.writeFileSync(outReview, offlineHtml);

  console.log(`=== /${page} ===`);
  console.log(`Article Pure Chinese Characters: ${chineseChars}`);
  console.log(`Missing #anchors: ${missingAnchors.length}`, missingAnchors);
  console.log(`Unique internal links in article: ${internalLinks.length}`);
  console.log(`Missing internal routes: ${missingRoutes.length}`, missingRoutes);
  console.log(`Offline review HTML saved: ${outReview}`);
}
