// Basic image filters
export const hueRotateFilter = (ctx: CanvasRenderingContext2D, deg: number) => {
  ctx.filter = `hue-rotate(${deg}deg)`;
};

export const contrastFilter = (ctx: CanvasRenderingContext2D, amount: number) => {
  ctx.filter = `contrast(${amount}%)`;
};

export const saturateFilter = (ctx: CanvasRenderingContext2D, amount: number) => {
  ctx.filter = `saturate(${amount}%)`;
};

export const sepiaFilter = (ctx: CanvasRenderingContext2D, amount: number) => {
  ctx.filter = `sepia(${amount}%)`;
};