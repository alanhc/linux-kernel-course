// 組裝 GitHub Pages 靜態站台到 site/
// 產物：
//   site/index.html          ← 導覽頁（連到自學頁與播放器）
//   site/week1.html          ← 互動自學頁（來源 web/week1.html）
//   site/player/index.html   ← Motion Canvas 網頁播放器頁
//   site/player/player.js    ← 自包含 player bundle（來源 embed/dist/player.js）
//   site/player/project.js   ← 場景 project bundle（來源 dist/src/project-*.js）
//
// 前置：需先跑過 `npm run build`（產生 dist/）與 embed 的 vite build（產生 embed/dist/）。
// 直接 `node scripts/build-site.mjs` 會自動觸發這兩個 build。
import {execSync} from 'node:child_process';
import {existsSync, mkdirSync, rmSync, copyFileSync, writeFileSync, readdirSync} from 'node:fs';
import {dirname, join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, 'site');

function run(cmd, cwd = root) {
  console.log(`$ ${cmd}`);
  execSync(cmd, {cwd, stdio: 'inherit'});
}

// 1. 建置場景 project bundle 與 player bundle
run('npm run build');
run('npx vite build', join(root, 'embed'));

// 2. 找出 hash 過的 project bundle 檔名
const projectDir = join(root, 'dist', 'src');
const projectFile = readdirSync(projectDir).find((f) => /^project-.*\.js$/.test(f));
if (!projectFile) throw new Error('找不到 dist/src/project-*.js，請確認 npm run build 成功');

// 3. 清空並重建 site/
rmSync(site, {recursive: true, force: true});
mkdirSync(join(site, 'player'), {recursive: true});

// 4. 複製自學頁與播放器資產
copyFileSync(join(root, 'web', 'week1.html'), join(site, 'week1.html'));
copyFileSync(join(root, 'embed', 'dist', 'player.js'), join(site, 'player', 'player.js'));
copyFileSync(join(projectDir, projectFile), join(site, 'player', 'project.js'));

// 5. 產生播放器頁
writeFileSync(
  join(site, 'player', 'index.html'),
  `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Linux 核心設計 · 第一週（場景播放器）</title>
<style>
  html,body{margin:0;height:100%;background:#0f172a;color:#e2e8f0;
    font-family:"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif}
  header{padding:14px 24px;border-bottom:1px solid #334155;display:flex;align-items:center;gap:14px}
  header a{color:#93c5fd;text-decoration:none;font-size:14px}
  header h1{font-size:16px;margin:0;color:#fff;font-weight:700}
  .wrap{max-width:1100px;margin:0 auto;padding:24px}
  motion-canvas-player{display:block;width:100%;aspect-ratio:16/9;border:1px solid #334155;border-radius:12px;overflow:hidden;background:#000}
  .hint{color:#94a3b8;font-size:13px;margin-top:14px}
</style>
</head>
<body>
<header>
  <a href="../index.html">← 回導覽</a>
  <h1>Motion Canvas 場景播放器</h1>
</header>
<div class="wrap">
  <motion-canvas-player src="./project.js" auto="true"></motion-canvas-player>
  <p class="hint">按播放鍵播放全部場景；滑鼠移到畫面上可拖動時間軸。此為 <code>src/scenes/</code> 場景的網頁預覽版。</p>
</div>
<script type="module" src="./player.js"></script>
</body>
</html>
`,
);

// 6. 產生導覽頁
writeFileSync(
  join(site, 'index.html'),
  `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Linux 核心設計教材</title>
<style>
  :root{--bg:#0f172a;--text:#e2e8f0;--title:#fff;--blue:#3b82f6;--panel:#1e293b;--line:#334155}
  html,body{margin:0;min-height:100%;background:var(--bg);color:var(--text);
    font-family:"Noto Sans TC","PingFang TC","Microsoft JhengHei",system-ui,sans-serif}
  .wrap{max-width:820px;margin:0 auto;padding:64px 24px}
  .eyebrow{color:var(--blue);font-size:14px;letter-spacing:2px;font-weight:700;margin-bottom:10px}
  h1{color:var(--title);font-size:34px;margin:0 0 12px}
  p.lead{font-size:18px;line-height:1.8;color:#cbd5e1;margin:0 0 40px}
  .cards{display:grid;gap:18px}
  a.card{display:block;text-decoration:none;background:var(--panel);border:1px solid var(--line);
    border-radius:16px;padding:24px 26px;transition:.15s}
  a.card:hover{border-color:var(--blue);transform:translateY(-2px)}
  a.card h2{color:var(--title);margin:0 0 8px;font-size:22px}
  a.card p{margin:0;color:#94a3b8;font-size:15px;line-height:1.7}
  footer{margin-top:48px;color:#64748b;font-size:13px}
  footer a{color:#93c5fd}
</style>
</head>
<body>
<div class="wrap">
  <div class="eyebrow">LINUX KERNEL DESIGN</div>
  <h1>Linux 核心設計教材</h1>
  <p class="lead">第一週互動教材與場景動畫。選擇下方入口開始。</p>
  <div class="cards">
    <a class="card" href="./week1.html">
      <h2>第一週 · 互動自學頁 →</h2>
      <p>學員自控步調的互動教材：概念說明、程式碼、流程圖與自我評量，一頁走完。</p>
    </a>
    <a class="card" href="./player/index.html">
      <h2>場景播放器 →</h2>
      <p>Motion Canvas 場景的網頁預覽版，可直接在瀏覽器播放各段動畫。</p>
    </a>
  </div>
  <footer>
    由教材 <code>content/week1.md</code> 產生 ·
    <a href="https://github.com/alanhc/linux-kernel-course">原始碼</a>
  </footer>
</div>
</body>
</html>
`,
);

console.log(`\n✓ 站台已組裝到 ${site}`);
console.log(`  project bundle: ${projectFile} → site/player/project.js`);
