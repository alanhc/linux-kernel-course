// 共用節奏參數與旁白字幕 helper —— 統一調整全片節奏的單一入口
import {Txt, View2D} from '@motion-canvas/2d';
import {createRef, Reference} from '@motion-canvas/core';

// 節奏（秒）：想整體加快/放慢，改這裡即可
export const FADE = 0.8;  // 淡入
export const BEAT = 1.2;  // 一般停頓
export const HOLD = 2.0;  // 段落停頓
export const READ = 3.0;  // 旁白字幕停留（給閱讀時間）

// 在畫面底部加一行旁白字幕，回傳 ref（初始 opacity 0）
export function addCaption(view: View2D, text: string): Reference<Txt> {
  const cap = createRef<Txt>();
  view.add(
    <Txt
      ref={cap}
      text={text}
      fontSize={30}
      fill={'#94a3b8'}
      y={430}
      width={1600}
      textAlign={'center'}
      textWrap
      opacity={0}
    />,
  );
  return cap;
}
