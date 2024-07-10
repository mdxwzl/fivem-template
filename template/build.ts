import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';

const clientDir = 'src/client';
const serverDir = 'src/server';
const sharedDir = 'src/shared';
const distDir = 'dist';

const getFilesWithExtension = (dir: string, extension: string) => {
  const files: string[] = [];
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      files.push(...getFilesWithExtension(filePath, extension));
    } else if (filePath.endsWith(extension)) {
      files.push(filePath);
    }
  });
  return files;
};

const tsFiles = [
  ...getFilesWithExtension(clientDir, '.ts'),
  ...getFilesWithExtension(serverDir, '.ts')
];

esbuild.buildSync({
  entryPoints: tsFiles,
  bundle: false,
  outdir: distDir,
  platform: 'node',
  target: 'es2020'
});

const copyLuaFiles = (srcDir: string, destDir: string) => {
  fs.readdirSync(srcDir).forEach(file => {
    const srcFilePath = path.join(srcDir, file);
    const destFilePath = path.join(destDir, file);
    const stat = fs.statSync(srcFilePath);
    if (stat.isDirectory()) {
      copyLuaFiles(srcFilePath, destFilePath);
    } else if (srcFilePath.endsWith('.lua')) {
      fs.mkdirSync(path.dirname(destFilePath), { recursive: true });
      fs.copyFileSync(srcFilePath, destFilePath);
    }
  });
};

copyLuaFiles(clientDir, path.join(distDir, 'client'));
copyLuaFiles(sharedDir, path.join(distDir, 'server'));
copyLuaFiles(sharedDir, path.join(distDir, 'shared'));

console.log('Build completed!');
