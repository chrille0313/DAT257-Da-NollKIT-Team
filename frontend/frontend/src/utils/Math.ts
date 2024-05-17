export function Clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(min, value), max);
}

export function ToKilo(value: number) {
  return value / 1000
}