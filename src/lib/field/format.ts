export function formatTimeScale(value: number) {
  return `${value.toFixed(2)}×`;
}

export function formatGravity(value: number) {
  return value.toFixed(2);
}

export function formatBodyCount(count: number) {
  return String(count).padStart(2, "0");
}

export function formatSimTime(seconds: number) {
  return seconds.toFixed(2);
}
