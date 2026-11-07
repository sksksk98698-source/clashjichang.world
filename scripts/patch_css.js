import fs from 'fs';

let css = fs.readFileSync('astroarabia/src/styles/global.css', 'utf8');
css = css.replace('direction: rtl;', 'direction: ltr;');
css = css.replace(
  "--font-sans: 'IBM Plex Sans Arabic', ui-sans-serif, system-ui, sans-serif;",
  '--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;'
);
css = css.replace(
  "--font-heading: 'Alexandria Variable', ui-sans-serif, system-ui, sans-serif;",
  '--font-heading: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;'
);

fs.writeFileSync('astroarabia/src/styles/global.css', css, 'utf8');
console.log('Successfully patched global.css!');
