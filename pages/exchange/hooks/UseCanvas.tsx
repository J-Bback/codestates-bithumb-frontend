import { useRef } from 'react';

export function UseCanvas() {}

export function draw(ctx: any, location: any) {
  ctx.fillStyle = 'black';
  ctx.fillRect(100, 100, 10, 30);
  ctx.save();
  ctx.rotate((225 * Math.PI) / 180);
}
