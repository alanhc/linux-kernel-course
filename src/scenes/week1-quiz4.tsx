// source: content/week1.md #自我評量4
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
      <Txt ref={question} text={'VFS（虛擬檔案系統）在核心中扮演的角色，最貼切的描述是？'} fontSize={44} fontWeight={800} fill={'#ffffff'} opacity={0} />
      {option(optA, 'a) 一種特定的磁碟檔案系統格式')}
      {option(optB, 'b) 一層抽象介面，讓上層以統一方式操作 ext4、Btrfs、網路檔案系統等不同實作')}
      {option(optC, 'c) 負責 CPU 排程的模組')}
    </Layout>,
  );
  const cap = addCaption(view, '解說：VFS 以統一介面隔離底層差異，是「以介面隔離變化」的經典範例。');

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
