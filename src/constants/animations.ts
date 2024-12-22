import { generateSteps } from '../utils/animationHelpers';
import { FRAME_COUNT } from '../constants';

// Basic transformations
export const partyTranslations = [
  [0, 0],
  [2, 2],
  [0, 2],
  [-2, 2],
  [-2, 0],
  [-2, -2],
  [0, -2],
  [2, -2],
  [2, 0],
  [0, 0],
];

export const shakingTranslations = [
  [0, 0],
  [-2, 0],
  [2, 0],
  [-2, 0],
  [2, 0],
  [-2, 0],
  [2, 0],
  [-2, 0],
  [2, 0],
  [0, 0],
];

export const bounceTranslations = [
  [0, 0],
  [0, -2],
  [0, -4],
  [0, -6],
  [0, -4],
  [0, -2],
  [0, 0],
  [0, 2],
  [0, 0],
  [0, 0],
];

export const twistAngles = generateSteps(-30, 30, true);
export const jelloScales = [
  [1, 1],
  [1.25, 0.75],
  [0.75, 1.25],
  [1.15, 0.85],
  [0.95, 1.05],
  [1.05, 0.95],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
];

export const scrollSteps = generateSteps(0, 1, false);

// New animations with smooth transitions
const floatRange = generateSteps(0, 4, true);
export const floatSteps = floatRange.map((y) => [0, -y]);

const swingRange = generateSteps(-20, 20, true);
export const swingSteps = swingRange.map((angle) => ({ angle }));

const zigzagRange = generateSteps(0, 10, true);
export const zigzagSteps = zigzagRange.map((i, idx) => [
  Math.sin((idx * Math.PI) / 2) * 3,
  -i / 2,
]);

const oscillateRange = generateSteps(-10, 10, true);
export const oscillateSteps = oscillateRange.map((x) => [x, 0]);

const skewRange = generateSteps(-15, 15, true);
export const skewSteps = skewRange.map((angle) => ({ skewX: angle, skewY: 0 }));

const pulseRange = generateSteps(0.8, 1.2, true);
export const pulseSteps = pulseRange.map((scale) => [scale, scale]);

const zoomRange = generateSteps(0.5, 1.5, true);
export const zoomSteps = zoomRange.map((scale) => [scale, scale]);

export const heartbeatSteps = [
  [1, 1],
  [1.2, 1.2],
  [0.9, 0.9],
  [1.3, 1.3],
  [0.95, 0.95],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
  [1, 1],
];

// Enhanced spiral animation with speed-adjusted rotations
const spiralRange = Array.from({ length: FRAME_COUNT }, (_, i) => i);
const halfFrames = Math.floor(FRAME_COUNT / 2);
export const spiralSteps = spiralRange.map((_, i) => {
  const forward = i < halfFrames;
  const progress = forward ? i / halfFrames : 2 - i / halfFrames;
  const baseRotation = 360; // One full rotation as base
  return {
    angle: progress * baseRotation, // Single rotation for normal speed
    scale: 0.2 + progress * 1.3, // Start small, grow, then shrink
    opacity: 1,
  };
});
