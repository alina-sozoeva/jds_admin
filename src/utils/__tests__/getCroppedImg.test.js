import { getRadianAngle } from '../getCroppedImg';

describe('getRadianAngle', () => {
  test('конвертирует 0 градусов в 0 радиан', () => {
    expect(getRadianAngle(0)).toBe(0);
  });

  test('конвертирует 90 градусов в π/2 радиан', () => {
    expect(getRadianAngle(90)).toBe(Math.PI / 2);
  });

  test('конвертирует 180 градусов в π радиан', () => {
    expect(getRadianAngle(180)).toBe(Math.PI);
  });

  test('конвертирует 360 градусов в 2π радиан', () => {
    expect(getRadianAngle(360)).toBe(2 * Math.PI);
  });
}); 