// Text overlays
import dododoText from '../images/texts/dododo.svg?url';
import goooText from '../images/texts/gooo.svg?url';
import zubanText from '../images/texts/zuban.svg?url';
import zuunText from '../images/texts/zuun.svg?url';
import ohText from '../images/texts/oh.svg?url';
import yeahText from '../images/texts/yeah.svg?url';
import yeeaaahText from '../images/texts/yeeaaah.svg?url';
import noText from '../images/texts/no.svg?url';
import noooText from '../images/texts/nooo.svg?url';
import yesText from '../images/texts/yes.svg?url';
import boomText from '../images/texts/boom.svg?url';

// Effect overlays
import angryEffect from '../images/effects/angry.svg?url';
import exclamationEffect from '../images/effects/exclamation-mark.svg?url';
import naniEffect from '../images/effects/nani.svg?url';
import questionEffect from '../images/effects/question-mark.svg?url';
import speedLinesEffect from '../images/effects/straight-lines.svg?url';
import sparklesEffect from '../images/effects/sparkles.svg?url';
import blushEffect from '../images/effects/blush.svg?url';
import sweatDropEffect from '../images/effects/sweat-drop.svg?url';
import musicNotesEffect from '../images/effects/music-notes.svg?url';
import zzzEffect from '../images/effects/zzz.svg?url';
import starsEffect from '../images/effects/stars.svg?url';

export const overlayMap = {
  dododo: {
    src: dododoText,
    opacity: 0.9,
    position: { x: 0, y: -30 },
    size: { width: 120 },
  },
  gooo: {
    src: goooText,
    opacity: 0.95,
    position: { x: 0, y: -30 },
    size: { width: 120 },
  },
  zuban: {
    src: zubanText,
    opacity: 0.9,
    position: { x: 0, y: -20 },
    size: { width: 120 },
  },
  zuun: {
    src: zuunText,
    opacity: 0.9,
    position: { y: -30 },
    size: { width: 120 },
  },
  oh: {
    src: ohText,
    opacity: 0.9,
    position: { y: -30 },
    size: { width: 120 },
  },
  yeah: {
    src: yeahText,
    opacity: 0.9,
    position: { y: -30 },
    size: { width: 120 },
  },
  yeeaaah: {
    src: yeeaaahText,
    opacity: 0.9,
    position: { y: -30 },
    size: { width: 120 },
  },
  no: {
    src: noText,
    opacity: 0.9,
    position: { y: -20 },
    size: { width: 100 },
  },
  nooo: {
    src: noooText,
    opacity: 0.9,
    position: { y: -40 },
    size: { width: 140 },
  },
  yes: {
    src: yesText,
    opacity: 0.9,
    position: { x: 0, y: -25 },
    size: { width: 110 },
  },
  boom: {
    src: boomText,
    opacity: 1,
    position: { x: 0, y: -40 },
    size: { width: 120 },
  },
  angry: {
    src: angryEffect,
    position: { x: 10, y: 10 },
    size: { width: 50, height: 50 },
  },
  exclamation: {
    src: exclamationEffect,
    opacity: 1,
    position: { x: 2, y: 10 },
    size: { width: 52, height: 52 },
  },
  nani: {
    src: naniEffect,
    opacity: 1,
    position: { x: 10, y: 10 },
    size: { width: 50, height: 44 },
  },
  question: {
    src: questionEffect,
    opacity: 1,
    position: { x: 2, y: 10 },
    size: { width: 50, height: 50 },
  },
  'speed-lines': {
    src: speedLinesEffect,
    opacity: 0.7,
    blendMode: 'multiply',
  },
  sparkles: {
    src: sparklesEffect,
    opacity: 1,
  },
  blush: {
    src: blushEffect,
    opacity: 0.8,
  },
  'sweat-drop': {
    src: sweatDropEffect,
    opacity: 1,
    position: { x: 70, y: 5 },
    size: { width: 35, height: 45 },
  },
  'music-notes': {
    src: musicNotesEffect,
    opacity: 1,
  },
  zzz: {
    src: zzzEffect,
    opacity: 0.9,
    position: { x: 65, y: 10 },
    size: { width: 50 },
  },
  stars: {
    src: starsEffect,
    opacity: 1,
  },
} as const;
