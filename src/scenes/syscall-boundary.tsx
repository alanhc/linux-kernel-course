// source: content/week1.md #syscall-boundary
// 單元 1：user / kernel 分隔線，三個呼叫穿越到對應子系統
import {makeScene2D, Rect, Txt, Line} from '@motion-canvas/2d';
import {createRef, all, chain, waitFor, Reference} from '@motion-canvas/core';
import {FADE, READ, addCaption} from '../lib/video';

export default makeScene2D(function* (view) {
  view.fill('#0f172a');

  const divider = createRef<Line>();
  const userLabel = createRef<Txt>();
  const kernelLabel = createRef<Txt>();
  const mallocCall = createRef<Txt>();
  const printfCall = createRef<Txt>();
  const threadCall = createRef<Txt>();
  const memSub = createRef<Txt>();
  const ioSub = createRef<Txt>();
  const schedSub = createRef<Txt>();
  const arrowMem = createRef<Line>();
  const arrowIo = createRef<Line>();
  const arrowSched = createRef<Line>();

  const call = (ref: Reference<Txt>, label: string, x: number) => (
    <Txt ref={ref} text={label} fontFamily={'monospace'} fontSize={34} fill={'#3b82f6'} x={x} y={-200} opacity={0} />
  );
  const sub = (ref: Reference<Txt>, label: string, x: number) => (
    <Txt ref={ref} text={label} fontSize={30} fill={'#e2e8f0'} x={x} y={200} opacity={0} />
  );
  const arrow = (ref: Reference<Line>, x: number) => (
    <Line ref={ref} points={[[x, -160], [x, 160]]} stroke={'#64748b'} lineWidth={3} endArrow opacity={0} />
  );

  view.add(
    <>
      <Txt ref={userLabel} text={'User space'} fontSize={28} fill={'#94a3b8'} x={-520} y={-40} opacity={0} />
      <Txt ref={kernelLabel} text={'Kernel space'} fontSize={28} fill={'#94a3b8'} x={-520} y={40} opacity={0} />
      <Line ref={divider} points={[[-620, 0], [620, 0]]} stroke={'#3b82f6'} lineWidth={4} opacity={0} lineDash={[16, 10]} />
      {call(mallocCall, 'malloc()', -360)}
      {call(printfCall, 'printf()', 0)}
      {call(threadCall, 'pthread_create()', 380)}
      {arrow(arrowMem, -360)}
      {arrow(arrowIo, 0)}
      {arrow(arrowSched, 380)}
      {sub(memSub, '記憶體管理', -360)}
      {sub(ioSub, '檔案 I/O', 0)}
      {sub(schedSub, '行程排程', 380)}
    </>,
  );
  const cap = addCaption(view, '你以為理所當然的 malloc、printf、開執行緒，背後都是核心在替你撐住。');

  yield* all(divider().opacity(1, FADE), userLabel().opacity(1, FADE), kernelLabel().opacity(1, FADE));
  yield* chain(
    all(mallocCall().opacity(1, FADE), arrowMem().opacity(1, FADE), memSub().opacity(1, FADE)),
    all(printfCall().opacity(1, FADE), arrowIo().opacity(1, FADE), ioSub().opacity(1, FADE)),
    all(threadCall().opacity(1, FADE), arrowSched().opacity(1, FADE), schedSub().opacity(1, FADE)),
  );
  yield* cap().opacity(1, FADE);
  yield* waitFor(READ);
});
