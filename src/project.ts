import {makeProject} from '@motion-canvas/core';

import roadmap from './scenes/week1-roadmap?scene';
import syscallBoundary from './scenes/syscall-boundary?scene';
import quiz1 from './scenes/week1-quiz1?scene';
import signedOverflow from './scenes/week1-signed-overflow?scene';
import quiz2 from './scenes/week1-quiz2?scene';
import toolchainPipeline from './scenes/toolchain-pipeline?scene';
import quiz3 from './scenes/week1-quiz3?scene';
import kernelSubsystems from './scenes/kernel-subsystems?scene';
import quiz4 from './scenes/week1-quiz4?scene';
import wrapup from './scenes/week1-wrapup?scene';

export default makeProject({
  scenes: [
    roadmap,
    syscallBoundary,
    quiz1,
    signedOverflow,
    quiz2,
    toolchainPipeline,
    quiz3,
    kernelSubsystems,
    quiz4,
    wrapup,
  ],
});
