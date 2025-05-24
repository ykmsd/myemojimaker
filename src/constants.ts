export const WIDTH = 128;
export const HEIGHT = 128;
export const FRAME_COUNT = 8; // Reduced from higher value in some cases
export const CONTRAST = 125;
export const SATURATE = 160;
export const SPIRAL_SPEED_MULTIPLIER = {
  slow: 0.5,    // Half speed
  normal: 1,    // Base speed (one rotation)
  fast: 2       // Double speed (two rotations)
};

export const ANIMATION_SPEEDS = {
  slow: 0.15,    // 3x slower
  normal: 0.1,   // 2x slower
  fast: 0.075    // 1.5x slower
};

export const DEFAULT_SPEED = 'normal';
export const SPEED_STORAGE_KEY = 'emojiAnimatorSpeed';

export const BLANK_GIF = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// Translations for different animations
export const partyTranslations = [
  [0, 0], [2, 2], [0, 2], [-2, 2], [-2, 0],
  [-2, -2], [0, -2], [2, -2], [2, 0], [0, 0]
];

export const shakingTranslations = [
  [0, 0], [-2, 0], [2, 0], [-2, 0], [2, 0],
  [-2, 0], [2, 0], [-2, 0], [2, 0], [0, 0]
];

export const bounceTranslations = [
  [0, 0], [0, -2], [0, -4], [0, -6], [0, -4],
  [0, -2], [0, 0], [0, 2], [0, 0], [0, 0]
];

export const twistAngles = [
  0, 15, 30, 45, 30,
  15, 0, -15, -30, 0
];

export const jelloScales = [
  [1, 1], [1.25, 0.75], [0.75, 1.25], [1.15, 0.85],
  [0.95, 1.05], [1.05, 0.95], [1, 1], [1, 1], [1, 1], [1, 1]
];

export const scrollSteps = [
  0, 0.1, 0.2, 0.3, 0.4,
  0.5, 0.6, 0.7, 0.8, 0.9
];