// source: content/week1.md #kernel-subsystems
// 單元 4：核心五大子系統心智圖，排程節點標記 Week 2
import {makeScene2D, Rect, Txt, Line} from '@motion-canvas/2d';
import {createRef, all, chain, waitFor, Reference} from '@motion-canvas/core';
import {FADE, BEAT, READ, addCaption} from '../lib/video';

export default makeScene2D(function* (view) {
  view.fill('#0f172a');

  const center = createRef<Rect>();
  const sched = createRef<Rect>();
  const mem = createRef<Rect>();
  const vfs = createRef<Rect>();
  const net = createRef<Rect>();
  const drv = createRef<Rect>();

  type NodeSpec = [Reference<Rect>, string, number, number, boolean];
  const specs: NodeSpec[] = [
    [sched, '行程與排程', -470, -170, true],
    [mem, '記憶體管理', 470, -170, false],
    [vfs, '檔案系統 / VFS', -470, 170, false],
    [net, '網路協定堆疊', 470, 170, false],
    [drv, '裝置驅動', 0, 250, false],
  ];

  view.add(
    <>
      {specs.map(([, , x, y]) => (
        <Line points={[[0, 0], [x, y]]} stroke={'#3b82f6'} lineWidth={2} opacity={0.35} />
      ))}
      <Rect ref={center} layout padding={[24, 40]} radius={16} fill={'#1e293b'} stroke={'#3b82f6'} lineWidth={3} opacity={0}>
        <Txt text={'Linux Kernel'} fontFamily={'monospace'} fontSize={40} fontWeight={800} fill={'#ffffff'} />
      </Rect>
      {specs.map(([ref, label, x, y, hot]) => (
        <Rect ref={ref} layout x={x} y={y} padding={[18, 28]} radius={12} fill={hot ? '#14532d' : '#1e293b'} stroke={hot ? '#22c55e' : '#334155'} lineWidth={2} opacity={0}>
          <Txt text={label + (hot ? '   Week 2 →' : '')} fontSize={30} fill={'#e2e8f0'} />
        </Rect>
      ))}
    </>,
  );
  const cap = addCaption(view, '五大子系統靠抽象層與明確介面協作——「用介面隔離變化」是整門課反覆出現的範本。');

  yield* center().opacity(1, FADE);
  yield* chain(...specs.map(([ref]) => ref().opacity(1, FADE)));
  yield* waitFor(BEAT);
  yield* all(sched().scale(1.05, 0.4));
  yield* sched().scale(1, 0.3);
  yield* cap().opacity(1, FADE);
  yield* waitFor(READ);
});
