import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { sync } from 'glob';
import handlebars from 'vite-plugin-handlebars';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const pages = sync('src/pages/*.html').reduce((acc, file) => {
  const name = path.basename(file, '.html');
  acc[name] = path.resolve(__dirname, file);
  return acc;
}, {});

export default defineConfig({
  root: 'src',
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, 'src/components'),
    }),
  ],
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: pages,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "variables" as *;`
      },
    },
  },
});