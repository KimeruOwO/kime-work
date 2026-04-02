import fs from 'node:fs';
import path from 'node:path';

function generateTree(dirPath, prefix = '') {
    let dirents;
    try {
        dirents = fs.readdirSync(dirPath, { withFileTypes: true });
    } catch (err) {
        console.log(`${prefix}└── [Access Denied]`);
        return;
    }

    const filteredDirents = dirents.filter(dirent => {
        if (dirent.name === 'node_modules' || dirent.name.startsWith('.')) {
            return false;
        }
        return true;
    });

    const len = filteredDirents.length;
    for (let i = 0; i < len; i++) {
        const dirent = filteredDirents[i];
        const isLast = (i === len - 1); 

        // Chọn cành để vẽ
        const branch = isLast ? '└── ' : '├── ';
        console.log(`${prefix}${branch}${dirent.name}`);

        // 4. Nếu là thư mục, đệ quy đi xuống
        if (dirent.isDirectory()) {
            const nextPath = path.join(dirPath, dirent.name);
            const nextPrefix = prefix + (isLast ? '    ' : '│   ');
            
            generateTree(nextPath, nextPrefix); 
        }
    }
}

console.log(path.basename(process.cwd()));
generateTree(process.cwd());