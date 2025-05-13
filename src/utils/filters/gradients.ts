// Gradient-based filters
export const rainbowFilter = (ctx: CanvasRenderingContext2D, offset: number) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height * 2);
  gradient.addColorStop(0, "rgb(255, 0, 0)");      // Red
  gradient.addColorStop(0.2, "rgb(255, 165, 0)");  // Orange
  gradient.addColorStop(0.4, "rgb(255, 255, 0)");  // Yellow
  gradient.addColorStop(0.6, "rgb(0, 255, 0)");    // Green
  gradient.addColorStop(0.8, "rgb(0, 0, 255)");    // Blue
  gradient.addColorStop(1, "rgb(128, 0, 128)");    // Purple

  ctx.save();
  ctx.globalCompositeOperation = "source-atop";
  ctx.globalAlpha = 0.8;  // Increased opacity for brighter effect
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(0, -offset);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height * 3);
  ctx.restore();
};

export const neonFilter = (ctx: CanvasRenderingContext2D, offset: number) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height * 2);
  gradient.addColorStop(0, "rgb(255, 0, 128)");     // Hot pink
  gradient.addColorStop(0.25, "rgb(0, 255, 255)");  // Electric cyan
  gradient.addColorStop(0.5, "rgb(128, 0, 255)");   // Electric purple
  gradient.addColorStop(0.75, "rgb(0, 255, 128)");  // Electric green
  gradient.addColorStop(1, "rgb(255, 0, 128)");     // Hot pink

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
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height * 2);
  gradient.addColorStop(0, "rgb(255, 66, 125)");   // Hot pink
  gradient.addColorStop(0.5, "rgb(120, 40, 140)"); // Purple
  gradient.addColorStop(1, "rgb(65, 220, 255)");   // Cyan

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
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height * 2);
  gradient.addColorStop(0, "rgb(255, 0, 0)");      // Red
  gradient.addColorStop(0.4, "rgb(255, 165, 0)");  // Orange
  gradient.addColorStop(0.7, "rgb(255, 255, 0)");  // Yellow
  gradient.addColorStop(1, "rgb(255, 0, 0)");      // Red

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
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height * 2);
  gradient.addColorStop(0, "rgb(150, 220, 255)");   // Bright ice blue
  gradient.addColorStop(0.4, "rgb(50, 150, 255)");  // Deep ice blue
  gradient.addColorStop(0.7, "rgb(0, 100, 255)");   // Intense blue
  gradient.addColorStop(1, "rgb(150, 220, 255)");   // Bright ice blue

  ctx.save();
  ctx.globalCompositeOperation = "source-atop";
  ctx.globalAlpha = 0.7;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(0, -offset);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height * 3);
  ctx.restore();
};