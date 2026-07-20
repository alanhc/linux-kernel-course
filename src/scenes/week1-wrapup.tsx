// source: content/week1.md #week1-wrapup
// 本週實作任務：四項逐一打勾，最後浮現 Week 2
import {makeScene2D, Rect, Txt, Layout} from '@motion-canvas/2d';
import {createRef, all, chain, waitFor} from '@motion-canvas/core';
import {FADE, BEAT, READ, addCaption} from '../lib/video';

export default makeScene2D(function* (view) {
  view.fill('#0f172a');

  const tasks = ['架環境（gcc / gdb / QEMU / git）', 'UB 實驗：-O0 vs -O2', '量測練習：perf stat', '改寫一題自我評量並附解答'];
  const boxes = tasks.map(() => createRef<Rect>());
  const ticks = tasks.map(() => createRef<Txt>());
  const next = createRef<Txt>();

  view.add(
    <Layout layout direction={'column'} gap={24} alignItems={'start'}>
      {tasks.map((t, i) => (
        <Layout layout direction={'row'} gap={20} alignItems={'center'}>
          <Rect ref={boxes[i]} width={44} height={44} radius={8} fill={'#1e293b'} stroke={'#334155'} lineWidth={2}>
            <Txt ref={ticks[i]} text={'✓'} fontSize={32} fontWeight={800} fill={'#22c55e'} opacity={0} />
          </Rect>
          <Txt text={t} fontSize={34} fill={'#e2e8f0'} />
        </Layout>
      ))}
      <Txt ref={next} text={'Week 2：行程與排程 →'} fontSize={38} fontWeight={700} fill={'#3b82f6'} opacity={0} marginTop={20} />
    </Layout>,
  );
  const cap = addCaption(view, '把環境、UB 實驗、量測練習做完——下週進入行程與排程。');

  yield* chain(
    ...boxes.map((b, i) => all(b().fill('#14532d', 0.5), b().stroke('#22c55e', 0.5), ticks[i]().opacity(1, 0.5), waitFor(0.3))),
  );
  yield* waitFor(BEAT);
  yield* next().opacity(1, FADE);
  yield* cap().opacity(1, FADE);
  yield* waitFor(READ);
});
