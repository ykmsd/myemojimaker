// Gradient-based filters
export const rainbowFilter = (ctx: CanvasRenderingContext2D, offset: number) => {
  // Create a gradient that's much larger than needed to ensure smooth looping
  const totalHeight = ctx.canvas.height * 5;
  const gradient = ctx.createLinearGradient(0, 0, 0, totalHeight);
  
  // Reversed color order: darker colors first (top), brighter colors last (bottom)
  gradient.addColorStop(0, "rgb(128, 0, 128)"); // Purple (dark)
  gradient.addColorStop(0.16, "rgb(0, 0, 255)"); // Blue
  gradient.addColorStop(0.33, "rgb(0, 255, 0)"); // Green
  gradient.addColorStop(0.5, "rgb(255, 255, 0)"); // Yellow
  gradient.addColorStop(0.66, "rgb(255, 165, 0)"); // Orange
  gradient.addColorStop(0.83, "rgb(255, 0, 0)"); // Red (bright)
  gradient.addColorStop(1, "rgb(128, 0, 128)"); // Purple (same as start)

  ctx.save();
  ctx.globalCompositeOperation = "source-atop";
  ctx.globalAlpha = 0.8;  // Increased opacity for brighter effect
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  
  // Calculate a continuous, seamless offset that wraps perfectly
  // Using positive offset to move downward instead of upward
  const normalizedOffset = (offset / ctx.canvas.height) % 1;  
  const continuousOffset = normalizedOffset * totalHeight;
  
  // Translate downward (positive value) instead of upward
  ctx.translate(0, continuousOffset);
  ctx.fillStyle = gradient;
  
  // Fill a much larger area to ensure no visible edges
  ctx.fillRect(0, -ctx.canvas.height, ctx.canvas.width, totalHeight + ctx.canvas.height);
  
  ctx.restore();
};

export const neonFilter = (ctx: CanvasRenderingContext2D, offset: number) => {
  // Create a gradient that's much larger than needed to ensure smooth looping
  const totalHeight = ctx.canvas.height * 5;
  const gradient = ctx.createLinearGradient(0, 0, 0, totalHeight);
  
  // Reversed color order: darker colors first (top), brighter colors last (bottom)
  gradient.addColorStop(0, "rgb(128, 0, 255)");   // Electric purple (darker)
  gradient.addColorStop(0.2, "rgb(255, 0, 128)");  // Hot pink
  gradient.addColorStop(0.4, "rgb(0, 255, 128)");  // Electric green
  gradient.addColorStop(0.6, "rgb(0, 255, 255)");  // Electric cyan (brighter)
  gradient.addColorStop(0.8, "rgb(128, 0, 255)");  // Electric purple
  gradient.addColorStop(1, "rgb(128, 0, 255)");   // Electric purple (same as start)

  ctx.save();
  ctx.globalCompositeOperation = "source-atop";
  ctx.globalAlpha = 0.7;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  
  // Calculate a continuous, seamless offset that wraps perfectly
  // Using positive offset to move downward instead of upward
  const normalizedOffset = (offset / ctx.canvas.height) % 1;  
  const continuousOffset = normalizedOffset * totalHeight;
  
  // Translate downward (positive value) instead of upward
  ctx.translate(0, continuousOffset);
  ctx.fillStyle = gradient;
  
  // Fill a much larger area to ensure no visible edges
  ctx.fillRect(0, -ctx.canvas.height, ctx.canvas.width, totalHeight + ctx.canvas.height);
  
  ctx.restore();
};

export const synthwaveFilter = (ctx: CanvasRenderingContext2D, offset: number) => {
  // Create a gradient that's much larger than needed to ensure smooth looping
  const totalHeight = ctx.canvas.height * 5;
  const gradient = ctx.createLinearGradient(0, 0, 0, totalHeight);
  
  // Reversed color order: darker colors first (top), brighter colors last (bottom)
  gradient.addColorStop(0, "rgb(120, 40, 140)"); // Purple (darker)
  gradient.addColorStop(0.25, "rgb(255, 66, 125)"); // Hot pink
  gradient.addColorStop(0.5, "rgb(65, 220, 255)"); // Cyan (brighter)
  gradient.addColorStop(0.75, "rgb(255, 66, 125)"); // Hot pink
  gradient.addColorStop(1, "rgb(120, 40, 140)"); // Purple (same as start)

  ctx.save();
  ctx.globalCompositeOperation = "source-atop";
  ctx.globalAlpha = 0.5;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  
  // Calculate a continuous, seamless offset that wraps perfectly
  // Using positive offset to move downward instead of upward
  const normalizedOffset = (offset / ctx.canvas.height) % 1;  
  const continuousOffset = normalizedOffset * totalHeight;
  
  // Translate downward (positive value) instead of upward
  ctx.translate(0, continuousOffset);
  ctx.fillStyle = gradient;
  
  // Fill a much larger area to ensure no visible edges
  ctx.fillRect(0, -ctx.canvas.height, ctx.canvas.width, totalHeight + ctx.canvas.height);
  
  ctx.restore();
};

export const fireFilter = (ctx: CanvasRenderingContext2D, offset: number) => {
  // Create a gradient that's much larger than needed to ensure smooth looping
  const totalHeight = ctx.canvas.height * 5;
  const gradient = ctx.createLinearGradient(0, 0, 0, totalHeight);
  
  // Reversed color order: darker colors first (top), brighter colors last (bottom)
  gradient.addColorStop(0, "rgb(255, 0, 0)");      // Red (darker)
  gradient.addColorStop(0.25, "rgb(255, 165, 0)");  // Orange
  gradient.addColorStop(0.5, "rgb(255, 255, 0)");  // Yellow (brighter)
  gradient.addColorStop(0.75, "rgb(255, 165, 0)");  // Orange again
  gradient.addColorStop(1, "rgb(255, 0, 0)");      // Red (same as start)

  ctx.save();
  ctx.globalCompositeOperation = "source-atop";
  ctx.globalAlpha = 0.55;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  
  // Calculate a continuous, seamless offset that wraps perfectly
  // Using positive offset to move downward instead of upward
  const normalizedOffset = (offset / ctx.canvas.height) % 1;  
  const continuousOffset = normalizedOffset * totalHeight;
  
  // Translate downward (positive value) instead of upward
  ctx.translate(0, continuousOffset);
  ctx.fillStyle = gradient;
  
  // Fill a much larger area to ensure no visible edges
  ctx.fillRect(0, -ctx.canvas.height, ctx.canvas.width, totalHeight + ctx.canvas.height);
  
  ctx.restore();
};

export const frozenFilter = (ctx: CanvasRenderingContext2D, offset: number) => {
  // Create a gradient that's much larger than needed to ensure smooth looping
  const totalHeight = ctx.canvas.height * 5;
  const gradient = ctx.createLinearGradient(0, 0, 0, totalHeight);
  
  // Reversed color order: darker colors first (top), brighter colors last (bottom)
  gradient.addColorStop(0, "rgb(0, 100, 255)");   // Intense blue (darker)
  gradient.addColorStop(0.25, "rgb(50, 150, 255)");  // Deep ice blue
  gradient.addColorStop(0.5, "rgb(150, 220, 255)");   // Bright ice blue (brighter)
  gradient.addColorStop(0.75, "rgb(50, 150, 255)");  // Deep ice blue again
  gradient.addColorStop(1, "rgb(0, 100, 255)");   // Intense blue (same as start)

  ctx.save();
  ctx.globalCompositeOperation = "source-atop";
  ctx.globalAlpha = 0.7;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  
  // Calculate a continuous, seamless offset that wraps perfectly
  // Using positive offset to move downward instead of upward
  const normalizedOffset = (offset / ctx.canvas.height) % 1;  
  const continuousOffset = normalizedOffset * totalHeight;
  
  // Translate downward (positive value) instead of upward
  ctx.translate(0, continuousOffset);
  ctx.fillStyle = gradient;
  
  // Fill a much larger area to ensure no visible edges
  ctx.fillRect(0, -ctx.canvas.height, ctx.canvas.width, totalHeight + ctx.canvas.height);
  
  ctx.restore();
};