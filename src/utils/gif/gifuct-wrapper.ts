// Directly import gifuct-js
import { parseGIF as parse, decompressFrames as decompress } from 'gifuct-js';

export async function parseGIF(buffer: ArrayBuffer) {
  return parse(buffer);
}

export async function decompressFrames(gif: any, buildPatch: boolean) {
  return decompress(gif, buildPatch);
}