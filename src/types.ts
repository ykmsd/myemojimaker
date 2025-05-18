interface EmojiPanelProps {
  img: string;
  transformation: keyof typeof TransformationType;
  name: string;
  interval: number;
  frameCount?: number;
}

export type Section = 'image' | 'text';

export interface NavigationProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

export enum AnimationSpeed {
  SLOW = 'slow',
  NORMAL = 'normal',
  FAST = 'fast',
}

export interface SpeedControlProps {
  selectedSpeed: AnimationSpeed;
  onSpeedChange: (speed: AnimationSpeed) => void;
}

export interface FontOption {
  label: string;
  value: string;
  category: 'fun' | 'fancy' | 'bold' | 'cute';
  url: string;
}

enum TransformationType {
  COLORS = 'colors',
  SPIN = 'spin',
  PARTY = 'party',
  SHAKING = 'shaking',
  ANGRY = 'angry',
  BOUNCE = 'bounce',
  TWIST = 'twist',
  JELLO = 'jello',
  SCROLL_V = 'scrollV',
  SCROLL_H = 'scrollH',
  FLIP_H = 'flipH',
  FLIP_V = 'flipV',
  FLOAT = 'float',
  SWING = 'swing',
  ZIGZAG = 'zigzag',
  OSCILLATE = 'oscillate',
  SKEW = 'skew',
  PULSE = 'pulse',
  ZOOM = 'zoom',
  HEARTBEAT = 'heartbeat',
  SPIRAL = 'spiral',
  RAINBOW = 'rainbow',
  NEON = 'neon',
  SYNTHWAVE = 'synthwave',
  FIRE = 'fire',
  FROZEN = 'frozen',
  RAIN = 'rain',
}

export interface SpeedControlProps {
  selectedSpeed: AnimationSpeed;
  onSpeedChange: (speed: AnimationSpeed) => void;
}
