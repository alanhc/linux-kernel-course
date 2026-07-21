# Linux 核心設計教材影片 — Motion Canvas 上機步驟

從零到能在本機預覽、render，並讓 Claude Code 依教材自動產生場景。

> **🌐 線上版：https://alanhc.github.io/linux-kernel-course/**
> 一份教材（`content/week1.md`）產出兩種形態：**互動自學頁**（自控步調）與 **Motion Canvas 場景播放器**（線性動畫）。推到 `main` 會自動部署到 GitHub Pages（見文末〈部署〉）。

## 1. 建立 Motion Canvas 專案
```bash
npm init @motion-canvas@latest
# 選 TypeScript 範本，專案名例如 kernel-videos
cd kernel-videos
npm install
```

## 2. 放入教材、指令與範例場景
在專案內建立目錄並放檔：
```
kernel-videos/
├── CLAUDE.md                     ← 本包的 agent 指令檔（放 repo 根目錄）
├── content/
│   └── week1.md                  ← 即 linux-kernel-week1.md，改名放這
└── src/
    └── scenes/
        ├── week1-signed-overflow.tsx   ← 範例：概念動畫
        └── week1-quiz2.tsx             ← 範例：自我評量動畫
```

## 3. 註冊場景 `src/project.ts`
打開 scaffold 產生的 `src/project.ts`，加入兩個場景。**import 寫法沿用你 scaffold 既有的那行**（新版直接 import，舊版需加 `?scene` 後綴）：
```ts
import {makeProject} from '@motion-canvas/core';
import signedOverflow from './scenes/week1-signed-overflow?scene';
import quiz2 from './scenes/week1-quiz2?scene';

export default makeProject({
  scenes: [signedOverflow, quiz2],
});
```

## 4. 即時預覽（真人微調的地方）
```bash
npm start
# 開 http://localhost:9000
```
在編輯器裡可即時看動畫、拖時間軸、調整參數——這就是你要的「真人易於檢查和調整」。

## 5. Render 成 MP4
編輯器右側 Video Settings → Render。輸出 MP4 需安裝 ffmpeg 外掛：
```bash
npm install @motion-canvas/ffmpeg
```
（安裝後於 `project.ts` 依官方文件註冊 ffmpeg exporter plugin。）

## 6. 交給 Claude Code 自動產生其餘場景
在專案目錄開終端機的 Claude Code，下這種指令（而非「做成影片」）：
```
claude
> 讀 content/week1.md，依 CLAUDE.md 規範，為尚未建立的 🎬 id 與 🧠 評量
  產生 src/scenes/ 對應場景，並在 src/project.ts 註冊。
  完成後列出你新增／修改了哪些場景、各對應哪個 id。
```

## 之後的循環
1. 教材（HackMD）更新 → sync 到 `content/week1.md`
2. 同一句指令再跑一次 → Claude 只產生變更場景的 diff
3. 你在 `npm start` 預覽微調 → 開 PR → 審 diff → 合併
4. 學員也能對 `content/` 或 `src/scenes/` 提 PR 貢獻

> 技術正確性由你把關：Claude 依教材原文產出，不臆測；有疑慮處它會在 PR 標「待人工確認」。

## 部署（GitHub Pages）

線上站台由 GitHub Actions 自動建置：**push 到 `main` 就會重建並部署**，不需手動操作。

### 網站結構
| 路徑 | 內容 | 來源 |
|------|------|------|
| `/` | 導覽頁（連到下面兩者） | `scripts/build-site.mjs` 產生 |
| `/week1.html` | 互動自學頁（自控步調） | `web/week1.html` |
| `/player/` | Motion Canvas 場景播放器 | `dist/` 場景 bundle + `embed/` 打包的 player |

### 本機預覽整個站台
```bash
npm run build:site      # 建置場景 + player，組裝到 site/
npx serve site          # 或任意靜態伺服器，開 http://localhost:3000
```
`build:site`（`scripts/build-site.mjs`）會依序：
1. `npm run build` — 產生場景 project bundle（`dist/src/project-*.js`）。
2. build `embed/` — 把 `@motion-canvas/player` 打包成自包含檔（player 套件本身有 bare import，靜態頁面無法直接載入，故需這步）。
3. 組裝 `site/`：導覽頁、自學頁、播放器頁與其資產。

### 運作方式
- workflow：`.github/workflows/deploy.yml`（`actions/upload-pages-artifact` + `actions/deploy-pages`）。
- Pages source 設為 **GitHub Actions**（非 `gh-pages` 分支）。
- `dist/`、`embed/dist/`、`site/` 皆為建置產物，已列入 `.gitignore`，不進版控。

> 教材或場景更新後，照上面〈之後的循環〉開 PR、合併到 `main`，Pages 即自動更新。
