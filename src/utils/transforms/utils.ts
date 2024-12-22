export function calculateAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
) {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return {
    width: srcWidth * ratio,
    height: srcHeight * ratio,
    x: (maxWidth - srcWidth * ratio) / 2,
    y: (maxHeight - srcHeight * ratio) / 2,
  };
}