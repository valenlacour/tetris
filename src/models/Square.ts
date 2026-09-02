/**
 * Representa uno de los 4 "elementos" (cuadraditos) que componen una pieza.
 * Las coordenadas son relativas al origen/eje de rotación de la pieza,
 * no a la posición absoluta en el tablero.
 */
export class Square {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = Square.normalizeZero(x);
    this._y = Square.normalizeZero(y);
  }

  getX(): number {
    return this._x;
  }

  setX(x: number): void {
    this._x = Square.normalizeZero(x);
  }

  getY(): number {
    return this._y;
  }

  setY(y: number): void {
    this._y = Square.normalizeZero(y);
  }

  // Las rotaciones (x,y) -> (-y,x) producen -0 cada vez que una coordenada
  // vale 0 (negar 0 en JS da -0). Numericamente -0 === 0, pero
  // Object.is(-0, 0) es false, y de ahi lo usan toBe/toEqual de Vitest:
  // sin esto, cualquier pieza rotada con una coordenada en 0 rompe esos
  // asserts aunque la posicion sea la correcta.
  private static normalizeZero(value: number): number {
    return value === 0 ? 0 : value;
  }

  equals(other: Square): boolean {
    return this._x === other.getX() && this._y === other.getY();
  }
}
