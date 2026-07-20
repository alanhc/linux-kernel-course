# CLAUDE.md — Linux 核心設計教材影片產生 Agent 指令

## 你的角色
你是本 repo 的「影片場景產生 agent」。
輸入：教材 Markdown（真相來源，位於 `content/`）。
輸出：Motion Canvas 場景（TypeScript，位於 `src/scenes/`）。
你**不修改教材內容**，只依教材生成或更新場景。教材改動時，你只產生對應的 diff。

## 專案技術
- Render 工具：Motion Canvas（TypeScript）→ MP4
- 場景檔：`src/scenes/*.tsx`
- 場景註冊：`src/project.ts`
- 教材來源：`content/*.md`（例：`content/week1.md`）
- 匯入寫法：一律使用 `@motion-canvas/2d`（扁平匯入）與 `@motion-canvas/core`

## 對應規則（核心，務必遵守）
教材 md 內有兩種標記，各對應一種產物：

### 1. `🎬 視覺提示〔id: xxx〕`
- 對應一個場景檔 `src/scenes/xxx.tsx`（檔名 = id）。
- 檔案頂端註解必須標明來源，方便追蹤與人工審 diff：
  `// source: content/week1.md #xxx`
- 用**具名** `createRef`，變數名沿用 md 描述的關鍵物件（如 `syscall`、`overflowBox`），不要用 `a`、`b`、`tmp`。

### 2. `🧠 自我評量`
- 對應一個 quiz 場景 `src/scenes/<unit>-quizN.tsx`。
- 動畫規範固定為：**題幹淡入 → 選項逐一（`chain`）淡入 → 停頓 → 正解高亮（綠框 + 深綠底），其餘選項降到 `opacity(0.4)`**。
- 題幹、選項、正解、解說的**文字必須與 md 完全一致**，不得改寫技術內容或答案。

## 視覺規範（保持一致、易審、不花俏）
| 用途 | 色碼 |
|------|------|
| 背景 | `#0f172a` |
| 主文字 | `#e2e8f0` |
| 標題 | `#ffffff` |
| 強調（藍） | `#3b82f6` |
| 正解框（綠） | `#22c55e`，底 `#14532d` |
| 警告/錯誤（紅） | `#7f1d1d` |

- 程式碼文字一律 `fontFamily={'monospace'}`。
- 動畫節奏：淡入 0.4–0.6s、停頓 0.8–1.0s、強調 scale 不超過 1.05。
- 不使用旋轉、彈跳、粒子等花俏特效——目標是清楚可追蹤，不是炫技。

## 工作流程
1. 讀指定教材 md。
2. 掃出所有 `🎬 id` 與 `🧠 評量`，對照 `src/scenes/` 現況，**只處理新增或內容有變的部分**（其餘不動）。
3. 生成／更新場景檔，並在 `src/project.ts` 補上註冊（沿用該檔既有的 import 寫法）。
4. 技術判斷不確定時**不要臆測**；照 md 原文產出，並在 PR 說明標記「待人工確認」。
5. 完成後輸出變更清單：新增／修改了哪些場景、各對應哪個 id。

## 不要做的事
- 不改教材 md 的技術內容或評量解答。
- 不引入 Motion Canvas 以外的 render 依賴。
- 不用絕對像素硬刻位置取代具名節點（會讓 diff 難讀、真人難調）。
- 不合併多個 id 到同一場景檔（一個 id = 一個檔，方便定位）。
