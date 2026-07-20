// source: content/week1.md #signed-overflow
// 對應教材「單元 2｜未定義行為」的視覺提示
import {makeScene2D, Txt, Rect} from '@motion-canvas/2d';
import {createRef, all, waitFor} from '@motion-canvas/core';
import {FADE, BEAT, READ, addCaption} from '../lib/video';

export default makeScene2D(function* (view) {
  view.fill('#0f172a');

  const code = createRef<Txt>();
  const guess = createRef<Txt>();
  const truthBox = createRef<Rect>();

  view.add(
    <Txt ref={code} text={'int a = INT_MAX;  a = a + 1;'} fontFamily={'monospace'} fontSize={46} fill={'#e2e8f0'} y={-180} opacity={0} />,
  );
  view.add(
    <Txt ref={guess} text={'你以為 → 回繞到 INT_MIN'} fontSize={40} fill={'#94a3b8'} y={-30} opacity={0} />,
  );
  view.add(
    <Rect ref={truthBox} layout padding={[22, 44]} radius={16} fill={'#7f1d1d'} y={110} opacity={0}>
      <Txt text={'C 標準 → 未定義行為（UB）'} fontSize={40} fontWeight={700} fill={'#ffffff'} />
    </Rect>,
  );
  const cap = addCaption(view, '有號整數溢位是未定義行為；別依賴「我覺得它會回繞」——需要回繞語意時改用 unsigned。');

  yield* code().opacity(1, FADE);
  yield* waitFor(BEAT);
  yield* guess().opacity(1, FADE);
  yield* waitFor(BEAT);
  yield* all(truthBox().opacity(1, FADE), truthBox().scale(1.05, 0.4));
  yield* truthBox().scale(1, 0.3);
  yield* cap().opacity(1, FADE);
  yield* waitFor(READ);
});
