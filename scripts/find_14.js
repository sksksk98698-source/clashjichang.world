import fs from 'fs';

const filePath = 'C:\\Users\\Pro User\\Desktop\\机场品牌信息\\42家机场品牌清单.txt';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const laterBrands = [];
let capture = false;
for (let i = 960; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.includes('这14家机场')) {
    capture = true;
    continue;
  }
  if (capture) {
    if (lines[i+1] && lines[i+1].trim() === '基础信息') {
      laterBrands.push({ line: i + 1, name: line });
    }
  }
}

console.log('Later 14 brands count:', laterBrands.length);
laterBrands.forEach(b => console.log(`${b.line}: ${b.name}`));
