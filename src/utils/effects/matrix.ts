import { WIDTH, HEIGHT } from '../../constants';

const FONT_SIZE = 20;
const COLUMNS = Math.floor(WIDTH / FONT_SIZE);
const SYMBOLS = "abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()あいうえおかきくけこ";
const ROWS = Math.floor(HEIGHT / FONT_SIZE);

interface MatrixState {
  drops: number[][];
}

// Store the matrix state
let matrixState: MatrixState | null = null;

function initializeMatrix(): MatrixState {
  return {
    drops: Array.from({ length: COLUMNS }, () =>
      Array.from({ length: ROWS }, () => Math.random() * HEIGHT)
    )
  };
}

export function createMatrixEffect(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement
): void {
  // Initialize state if needed
  if (!matrixState) {
    matrixState = initializeMatrix();
  }

  // Clear with trail effect
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  // Draw background image
  ctx.globalAlpha = 0.3;
  ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);

  // Configure matrix text style
  ctx.font = `${FONT_SIZE}px monospace`;
  ctx.fillStyle = "#0F0";

  // Draw matrix rain
  matrixState.drops.forEach((column, colIndex) => {
    column.forEach((yPos, rowIndex) => {
      const text = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      const xPos = colIndex * FONT_SIZE;

      // Draw character
      ctx.globalAlpha = 0.7 + Math.random() * 0.3;
      ctx.fillText(text, xPos, yPos);

      // Update position
      matrixState!.drops[colIndex][rowIndex] += FONT_SIZE * 0.5;
      if (matrixState!.drops[colIndex][rowIndex] > HEIGHT) {
        matrixState!.drops[colIndex][rowIndex] = -FONT_SIZE * Math.random() * 20;
      }
    });
  });

  // Overlay image
  ctx.globalAlpha = 0.5;
  ctx.drawImage(img, 0, 0, WIDTH, HEIGHT);

  // Reset opacity
  ctx.globalAlpha = 1;
}