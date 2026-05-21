/**
 * Simple semaphore to limit concurrent async operations.
 * Prevents all ~40 effects from generating simultaneously.
 */
export function createSemaphore(maxConcurrent: number) {
  let running = 0;
  const queue: Array<() => void> = [];

  function release() {
    running--;
    if (queue.length > 0) {
      running++;
      const next = queue.shift()!;
      next();
    }
  }

  function acquire(): Promise<() => void> {
    return new Promise<() => void>((resolve) => {
      const start = () => resolve(release);
      if (running < maxConcurrent) {
        running++;
        start();
      } else {
        queue.push(start);
      }
    });
  }

  return { acquire };
}

/** Shared limiter for GIF generation — max 4 concurrent builds */
export const gifGenerationLimiter = createSemaphore(4);
