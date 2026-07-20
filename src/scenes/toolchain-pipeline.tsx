// source: content/week1.md #toolchain-pipeline
// 單元 3：工具鏈流程 原始碼 → gcc → QEMU → gdb → perf
import {makeScene2D, Rect, Txt, Layout} from '@motion-canvas/2d';
import {createRef, all, chain, waitFor} from '@motion-canvas/core';
import {FADE, BEAT, READ, addCaption} from '../lib/video';

export default makeScene2D(function* (view) {
  view.fill('#0f172a');

  const src = createRef<Rect>();
  const gcc = createRef<Rect>();
  const qemu = createRef<Rect>();
  const gdb = createRef<Rect>();
  const perf = createRef<Rect>();
  const refs = [src, gcc, qemu, gdb, perf];
  const labels = ['原始碼', 'gcc', 'QEMU', 'gdb', 'perf'];

  const boxes = refs.map((ref, i) => (
    <Rect ref={ref} layout padding={[22, 30]} radius={12} fill={i === 4 ? '#14532d' : '#1e293b'} stroke={i === 4 ? '#22c55e' : '#334155'} lineWidth={2} opacity={0}>
      <Txt text={labels[i]} fontFamily={'monospace'} fontSize={32} fill={'#e2e8f0'} />
    </Rect>
  ));

  view.add(
    <Layout layout direction={'row'} gap={40} alignItems={'center'}>
      {boxes}
    </Layout>,
  );
  const cap = addCaption(view, '核心的世界裡直覺經常是錯的——cache、分支預測都在背後作祟。先量測，再下結論。');

  yield* chain(...refs.map(r => r().opacity(1, FADE)));
  yield* waitFor(BEAT);
  yield* all(perf().scale(1.05, 0.4));
  yield* perf().scale(1, 0.3);
  yield* cap().opacity(1, FADE);
  yield* waitFor(READ);
});
