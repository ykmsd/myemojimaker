import { WIDTH, HEIGHT } from '../../constants';
import { calculateAspectRatioFit } from '../transforms/utils';

interface ConfettiPiece {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  speedY: number;
  speedX: number;
}

let confetti: ConfettiPiece[] = [];

const colors = [
  '#ff0000',
  '#ff1744',
  '#ff4081',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#00e5ff',
  '#00ffff',
  '#1de9b6',
  '#00e676',
  '#76ff03',
  '#c6ff00',
  '#ffea00',
  '#ffc400',
  '#ff9100',
  '#ff6d00',
  '#ff5722',
  '#f50057',
  '#d500f9',
  '#651fff',
  '#00e5ff',
  '#ffd700',
  '#ff1493',
  '#00ff7f',
  '#ff6347',
  '#4169e1',
];

const initConfetti = () => {
  if (confetti.length === 0) {
    confetti = Array.from({ length: 200 }, () => ({
      x: Math.random() * WIDTH,
      y: -Math.random() * HEIGHT * 2,
      width: Math.random() * 10 + 6,
      height: Math.random() * 8 + 4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 1.5,
      speedX: (Math.random() - 0.5) * 3,
    }));
  }
};

export const createConfettiEffect = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | HTMLCanvasElement,
  frameIndex: number
) => {
  initConfetti();

  const dims = calculateAspectRatioFit(img.width, img.height, WIDTH, HEIGHT);

  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.translate(WIDTH / 2, HEIGHT / 2);
  ctx.drawImage(img, -dims.width / 2, -dims.height / 2, dims.width, dims.height);
  ctx.translate(-WIDTH / 2, -HEIGHT / 2);

  confetti.forEach((piece) => {
    piece.y += piece.speedY;
    piece.x += piece.speedX;
    piece.rotation += piece.rotationSpeed;

    if (piece.y > HEIGHT + 10) {
      piece.y = -10;
      piece.x = Math.random() * WIDTH;
    }

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.width / 2, -piece.height / 2, piece.width, piece.height);
    ctx.restore();
  });
};
