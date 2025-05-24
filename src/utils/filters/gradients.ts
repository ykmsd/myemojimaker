import { HEIGHT } from '../../constants';

// Gradient-based filters
export const rainbowFilter = (ctx: CanvasRenderingContext2D, offset: number) => {
  // Use a larger gradient space to ensure smooth looping
  const gradient = ctx.createLinearGradient(0, -HEIGHT, 0, HEIGHT * 3);
  
  // Add color stops with more overlap to ensure smoother transitions
  gradient.addColorStop(0, "rgb(255, 0, 0)");      // Red
  gradient.addColorStop(0.16, "rgb(255, 165, 0)"); // Orange
  gradient.addColorStop(0.33, "rgb(255, 255, 0)"); // Yellow
  gradient.addColorStop(0.5, "rgb(0, 255, 0)");    // Green
  gradient.addColorStop(0.66, "rgb(0, 0, 255)");   // Blue
  gradient.addColorStop(0.83, "rgb(128, 0, 128)"); // Purple
  gradient.addColorStop(1, "rgb(255, 0, 0)");      // Red (repeat to ensure loop)

  ctx.save();
  ctx.globalCompositeOperation = "source-atop";
  ctx.globalAlpha = 0.8;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(0, -offset);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height * 3);
  ctx.restore();
};

export const neonFilter = (ctx: CanvasRenderingContext2D, offset: number) => {
  // Expanded gradient for smoother looping
  const gradient = ctx.createLinearGradient(0, -HEIGHT, 0, HEIGHT * 3);
  
  // Repeating colors to ensure smooth transitions
  gradient.addColorStop(0, "rgb(255, 0, 128)");     // Hot pink
  gradient.addColorStop(0.2, "rgb(0, 255, 255)");   // Electric cyan
  gradient.addColorStop(0.4, "rgb(128, 0, 255)");   // Electric purple
  gradient.addColorStop(0.6, "rgb(0, 255, 128)");   // Electric green
  gradient.addColorStop(0.8, "rgb(255, 0, 128)");   // Hot pink (repeat)
  gradient.addColorStop(1, "rgb(0, 255, 255)");     // Electric cyan (repeat)

  ctx.save();
  ctx.globalCompositeOperation = "source-atop";
  ctx.globalAlpha = 0.7;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(0, -offset);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height * 3);
  ctx.restore();
};

export const synthwaveFilter = (ctx: CanvasRenderingContext2D, offset: number) => {
  // Extended gradient space for continuous flow
  const gradient = ctx.createLinearGradient(0, -HEIGHT, 0, HEIGHT * 3);
  
  // Add repeated color stops for seamless looping
  gradient.addColorStop(0, "rgb(255, 66, 125)");   // Hot pink
  gradient.addColorStop(0.33, "rgb(120, 40, 140)"); // Purple
  gradient.addColorStop(0.66, "rgb(65, 220, 255)"); // Cyan
  gradient.addColorStop(1, "rgb(255, 66, 125)");   // Hot pink (repeat)

  ctx.save();
  ctx.globalCompositeOperation = "source-atop";
  ctx.globalAlpha = 0.5;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(0, -offset);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height * 3);
  ctx.restore();
};

export const fireFilter = (ctx: CanvasRenderingContext2D, offset: number) => {
  // Extended gradient for continuous animation
  const gradient = ctx.createLinearGradient(0, -HEIGHT, 0, HEIGHT * 3);
  
  // Repeating color pattern for seamless looping
  gradient.addColorStop(0, "rgb(255, 0, 0)");      // Red
  gradient.addColorStop(0.25, "rgb(255, 165, 0)");  // Orange
  gradient.addColorStop(0.5, "rgb(255, 255, 0)");  // Yellow
  gradient.addColorStop(0.75, "rgb(255, 0, 0)");    // Red (repeat)
  gradient.addColorStop(1, "rgb(255, 165, 0)");    // Orange (repeat)

  ctx.save();
  ctx.globalCompositeOperation = "source-atop";
  ctx.globalAlpha = 0.55;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(0, -offset);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height * 3);
  ctx.restore();
};

export const frozenFilter = (ctx: CanvasRenderingContext2D, offset: number) => {
  // Extended gradient for continuous flow
  const gradient = ctx.createLinearGradient(0, -HEIGHT, 0, HEIGHT * 3);
  
  // Repeating color pattern for seamless looping
  gradient.addColorStop(0, "rgb(150, 220, 255)");   // Bright ice blue
  gradient.addColorStop(0.25, "rgb(50, 150, 255)");  // Deep ice blue
  gradient.addColorStop(0.5, "rgb(0, 100, 255)");   // Intense blue
  gradient.addColorStop(0.75, "rgb(150, 220, 255)");   // Bright ice blue (repeat)
  gradient.addColorStop(1, "rgb(50, 150, 255)");   // Deep ice blue (repeat)

  ctx.save();
  ctx.globalCompositeOperation = "source-atop";
  ctx.globalAlpha = 0.7;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(0, -offset);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height * 3);
  ctx.restore();
};