import { WIDTH, HEIGHT } from '../../constants';

interface MoneyPiece {
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  speedY: number;
  speedX: number;
  scale: number;
}

let moneyPieces: MoneyPiece[] = [];

const initMoney = () => {
  if (moneyPieces.length === 0) {
    moneyPieces = Array.from({ length: 50 }, (_, idx) => {
      const progress = idx / 50;
      const totalDistance = HEIGHT + 40;
      const currentPosition = progress * totalDistance;

      return {
        x: Math.random() * WIDTH,
        y: -20 + currentPosition,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        speedY: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 1.5,
        scale: Math.random() * 0.5 + 0.7,
      };
    });
  }
};

export const createMoneyRainEffect = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | HTMLCanvasElement,
  frameIndex: number
) => {
  initMoney();

  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);

  moneyPieces.forEach((piece) => {
    piece.y += piece.speedY;
    piece.x += piece.speedX;
    piece.rotation += piece.rotationSpeed;

    if (piece.y > HEIGHT + 20) {
      piece.y = -20;
      piece.x = Math.random() * WIDTH;
      piece.speedY = Math.random() * 3 + 2;
      piece.speedX = (Math.random() - 0.5) * 1.5;
    }

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    ctx.scale(piece.scale, piece.scale);

    ctx.font = '32px Arial';
    ctx.fillText('💸', -16, 16);

    ctx.restore();
  });
};
