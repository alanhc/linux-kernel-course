// source: content/week1.md #自我評量2
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
      <Txt ref={question} text={'INT_MAX + 1 的行為是？'} fontSize={52} fontWeight={800} fill={'#ffffff'} opacity={0} />
      {option(optA, 'a) 保證回繞到 INT_MIN，可用來做溢位檢查')}
      {option(optB, 'b) 未定義行為，編譯器可能假設它不發生並移除檢查')}
      {option(optC, 'c) 一定會讓程式當機')}
    </Layout>,
  );
  const cap = addCaption(view, '解說：需要有定義的回繞語意時改用 unsigned；UB 不保證當機，反而常「看似正常」直到某次最佳化才爆。');

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
