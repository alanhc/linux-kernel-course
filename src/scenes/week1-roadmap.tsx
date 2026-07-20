// source: content/week1.md #week1-roadmap
// 單元 0 本週地圖：中心節點 + 四個主題節點依序亮起
import {makeScene2D, Rect, Txt, Line} from '@motion-canvas/2d';
import {createRef, all, chain, waitFor, Reference} from '@motion-canvas/core';
import {FADE, BEAT, READ, addCaption} from '../lib/video';

export default makeScene2D(function* (view) {
  view.fill('#0f172a');

  const center = createRef<Rect>();
  const whyKernel = createRef<Rect>();
  const cBasics = createRef<Rect>();
  const devEnv = createRef<Rect>();
  const bigPicture = createRef<Rect>();
  const lineWhy = createRef<Line>();
  const lineC = createRef<Line>();
  const lineEnv = createRef<Line>();
  const lineBig = createRef<Line>();

  const node = (ref: Reference<Rect>, label: string, x: number, y: number) => (
    <Rect ref={ref} layout x={x} y={y} padding={[20, 30]} radius={14} fill={'#1e293b'} opacity={0}>
      <Txt text={label} fontSize={34} fill={'#e2e8f0'} />
    </Rect>
  );
  const link = (ref: Reference<Line>, x: number, y: number) => (
    <Line ref={ref} points={[[0, 0], [x, y]]} stroke={'#3b82f6'} lineWidth={3} opacity={0} />
  );

  view.add(
    <>
      {link(lineWhy, -430, -170)}
      {link(lineC, 430, -170)}
      {link(lineEnv, -430, 170)}
      {link(lineBig, 430, 170)}
      <Rect ref={center} layout padding={[24, 40]} radius={16} fill={'#14532d'} stroke={'#22c55e'} lineWidth={3} opacity={0}>
        <Txt text={'第一週'} fontSize={44} fontWeight={800} fill={'#ffffff'} />
      </Rect>
      {node(whyKernel, '為何讀核心', -430, -190)}
      {node(cBasics, 'C 與底層基礎', 430, -190)}
      {node(devEnv, '開發環境', -430, 190)}
      {node(bigPicture, '巨觀結構', 430, 190)}
    </>,
  );
  const cap = addCaption(view, '第一週不急著讀原始碼——先建立心態與工具，後面十幾週才不會半途卡死。');

  yield* center().opacity(1, FADE);
  yield* chain(
    all(whyKernel().opacity(1, FADE), lineWhy().opacity(1, FADE)),
    all(cBasics().opacity(1, FADE), lineC().opacity(1, FADE)),
    all(devEnv().opacity(1, FADE), lineEnv().opacity(1, FADE)),
    all(bigPicture().opacity(1, FADE), lineBig().opacity(1, FADE)),
  );
  yield* cap().opacity(1, FADE);
  yield* waitFor(READ);
});
