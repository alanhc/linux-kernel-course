// source: content/week1.md #自我評量3
// 題幹淡入 → 選項逐一淡入 → 停頓思考 → 正解（a）高亮 → 解說停留
import {makeScene2D, Txt, Rect, Layout} from '@motion-canvas/2d';
import {createRef, all, chain, waitFor, Reference} from '@motion-canvas/core';
import {FADE, HOLD, READ, addCaption} from '../lib/video';

export default makeScene2D(function* (view) {
  view.fill('#0f172a');

  const question = createRef<Txt>();
  const optA = createRef<Rect>();
  const optB = createRef<Rect>();
  const optC = createRef<Rect>();

  const option = (ref: Reference<Rect>, label: string) => (
    <Rect ref={ref} layout width={1040} padding={[20, 32]} radius={14} fill={'#1e293b'} opacity={0}>
      <Txt text={label} fontSize={32} fill={'#e2e8f0'} />
    </Rect>
  );

  view.add(
    <Layout layout direction={'column'} gap={26} alignItems={'center'}>
      <Txt ref={question} text={'不確定哪一次 commit 讓功能出錯，最有效率的定位工具是？'} fontSize={44} fontWeight={800} fill={'#ffffff'} opacity={0} />
      {option(optA, 'a) git bisect：以二分搜尋在提交歷史中快速定位出問題的 commit')}
      {option(optB, 'b) 從第一個 commit 逐一手動檢查')}
      {option(optC, 'c) 直接重寫整個模組')}
    </Layout>,
  );
  const cap = addCaption(view, '解說：git bisect 以 O(log n) 次測試定位問題 commit，比逐一手動的 O(n) 快得多。');

  yield* question().opacity(1, FADE);
  yield* chain(optA().opacity(1, FADE), optB().opacity(1, FADE), optC().opacity(1, FADE));
  yield* waitFor(HOLD);
  yield* all(
    optA().fill('#14532d', FADE),
    optA().stroke('#22c55e', FADE),
    optA().lineWidth(4, FADE),
    optB().opacity(0.4, FADE),
    optC().opacity(0.4, FADE),
  );
  yield* cap().opacity(1, FADE);
  yield* waitFor(READ);
});
