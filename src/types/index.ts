export * from './effects';

export interface EmojiPanelProps {
  img: string;
  transformation: string;
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
  FAST = 'fast'
}

export interface SpeedControlProps {
  selectedSpeed: AnimationSpeed;
  onSpeedChange: (speed: AnimationSpeed) => void;
}

export interface FontOption {
  label: string;
  value: string;
  category: 'japanese' | 'fun' | 'fancy' | 'bold' | 'cute';
  url: string;
}

export { AnimatedEffectType as TransformationType } from './effects';