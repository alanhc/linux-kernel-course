// source: content/week1.md #自我評量1
// 題幹淡入 → 選項逐一淡入 → 停頓思考 → 正解（b）高亮 → 解說停留
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
      <Txt ref={question} text={'研讀 Linux 核心原始碼，最核心的學習目的是什麼？'} fontSize={46} fontWeight={800} fill={'#ffffff'} opacity={0} />
      {option(optA, 'a) 背下常用核心函式的名稱與參數')}
      {option(optB, 'b) 理解系統在各種限制下所做的「工程取捨」，並能據此除錯與設計')}
      {option(optC, 'c) 記住每個檔案在原始碼樹的路徑')}
    </Layout>,
  );
  const cap = addCaption(view, '解說：核心的價值在於「為什麼這樣設計」——取捨的判斷力，才是稀缺的能力。');

  yield* question().opacity(1, FADE);
  yield* chain(optA().opacity(1, FADE), optB().opacity(1, FADE), optC().opacity(1, FADE));
  yield* waitFor(HOLD);
  yield* all(
    optB().fill('#14532d', FADE),
    optB().stroke('#22c55e', FADE),
    optB().lineWidth(4, FADE),
    optA().opacity(0.4, FADE),
    optC().opacity(0.4, FADE),
  );
  yield* cap().opacity(1, FADE);
  yield* waitFor(READ);
});
