import { FONTS } from '../constants/fonts';

const DEFAULT_FONT = FONTS.find(font => font.value === 'Bungee Shade')?.value || 'Arial';

export const textToImage = (
  text: string,
  textColor: string,
  fontFamily: string = DEFAULT_FONT,
  backgroundColor: string | null = null,
  outlineColor: string | null = null,
  outlineWidth: number = 2,
  width: number = 128,
  height: number = 128,
  padding: number = 20,
  fontSize: number = 90,
  textAlign: CanvasTextAlign = 'center',
  textBaseline: CanvasTextBaseline = 'middle'
): string => {
  // Create temporary canvas to measure text
  const tempCanvas = document.createElement('canvas');
  const tempCtx = tempCanvas.getContext('2d');

  if (!tempCtx) return '';

  // Set font to measure text accurately
  tempCtx.font = `bold ${fontSize}px "${fontFamily}"`;
  const metrics = tempCtx.measureText(text);

  // Calculate text dimensions including outline
  const outlinePadding = outlineWidth * 4;
  const textWidth = metrics.width + outlinePadding;
  const textHeight = fontSize + outlinePadding;

  // Calculate canvas size - ensure it fits the text with padding
  const canvasWidth = Math.max(width, textWidth + padding * 2);
  const canvasHeight = Math.max(height, textHeight + padding * 2);

  // Create actual canvas with dynamic size
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  if (!ctx) return '';

  // Clear canvas
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Fill background if specified
  if (backgroundColor) {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  // Set text properties
  ctx.textAlign = textAlign;
  ctx.textBaseline = textBaseline;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Use dynamic font size
  ctx.font = `bold ${fontSize}px "${fontFamily}"`;

  // Apply transformations based on alignment
  let xPos = canvasWidth / 2;
  let yPos = canvasHeight / 2;

  if (textAlign === 'left') {
    xPos = padding;
  } else if (textAlign === 'right') {
    xPos = canvasWidth - padding;
  }

  if (textBaseline === 'top') {
    yPos = padding;
  } else if (textBaseline === 'bottom') {
    yPos = canvasHeight - padding;
  }

  ctx.translate(xPos, yPos);
  
  // Add outline if specified
  if (outlineColor) {
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = outlineWidth * 2; // Double the width for better visibility
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    
    // Draw stroke multiple times for better visibility
    for (let i = 0; i < 3; i++) {
      ctx.strokeText(text, 0, 0);
    }
  }
  
  // Add main text
  ctx.fillStyle = textColor;
  ctx.fillText(text, 0, 0);
  
  return canvas.toDataURL('image/png');
};