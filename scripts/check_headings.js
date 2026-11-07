import fs from 'fs';

const filePath = 'C:\\Users\\Pro User\\Desktop\\机场品牌信息\\42家机场品牌清单.txt';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

const headings = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.includes('##') && !line.includes('###') && !line.includes('一、') && !line.includes('二、') && !line.includes('三、')) {
    headings.push({ line: i + 1, text: line });
  }
}

console.log('Heading count:', headings.length);
headings.forEach(h => console.log(`${h.line}: ${h.text}`));
