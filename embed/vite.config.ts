import {defineConfig} from 'vite';

// 獨立打包 @motion-canvas/player 成單一自包含檔（含 core），
// 供靜態 player 頁面用 <script type="module"> 載入。
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: 'player-entry.ts',
      formats: ['es'],
      fileName: () => 'player.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
