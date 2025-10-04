// Animation effects for GIF generation
export enum AnimatedEffectType {
  // Basic Movement
  SPIN = 'spin',
  OSCILLATE = 'oscillate',
  FLOAT = 'float',

  // Shake & Bounce
  PARTY = 'party',
  SHAKING = 'shaking',
  BOUNCE = 'bounce',

  // Transform
  JELLO = 'jello',
  SKEW = 'skew',
  SPIRAL = 'spiral',

  // Scale
  PULSE = 'pulse',
  ZOOM = 'zoom',
  HEARTBEAT = 'heartbeat',

  // Scroll & Path
  SCROLL_V = 'scroll-vertical',
  SCROLL_H = 'scroll-horizontal',
  ZIGZAG = 'zigzag',
  SWING = 'swing',

  // Visual Effects
  GLITCH = 'glitch',
  STARDUST = 'stardust',
  MATRIX = 'matrix',
  SPACE_TRAVEL = 'space-travel',
  CUTE_HEARTS = 'cute-hearts',
  CONFETTI = 'confetti',
  STARS = 'stars',
  FIREWORKS = 'fireworks',
  EXPLODE = 'explode',

  // Color Effects
  RAINBOW = 'rainbow',
  NEON = 'neon',
  SYNTHWAVE = 'synthwave',
  FIRE = 'fire',
  FROZEN = 'frozen',
  RAIN = 'rain',
  RAINBOW_RAIN = 'rainbow-rain',
  THIS_IS_FINE = 'this-is-fine',
  CUSTOM_GIF = 'custom-gif'
}

// Static effects for PNG generation
export enum StaticEffectType {
  // Text Overlays
  MANGA_DODODO = 'dododo',
  MANGA_GOOO = 'gooo',
  MANGA_ZUUN = 'zuun',
  MANGA_OH = 'oh',
  MANGA_YEAH = 'yeah',
  MANGA_YEEAAAH = 'yeeaaah',
  MANGA_NO = 'no',
  MANGA_NOOO = 'nooo',
  MANGA_YES = 'yes',
  MANGA_BOOM = 'boom',

  // Visual Effects
  EFFECT_ANGRY = 'angry',
  EFFECT_EXCLAMATION = 'exclamation',
  EFFECT_NANI = 'nani',
  EFFECT_QUESTION = 'question',
  EFFECT_SPEED_LINES = 'speed-lines'
}

// Types for static effect configuration
export interface StaticEffect {
  src: string;
  position?: {
    x?: number;
    y?: number;
  };
  size?: {
    width?: number;
    height?: number;
  };
  opacity?: number;
  blendMode?: GlobalCompositeOperation;
  isAnimated?: boolean;
}