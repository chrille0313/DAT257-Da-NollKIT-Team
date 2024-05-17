export function Clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(min, value), max);
}
