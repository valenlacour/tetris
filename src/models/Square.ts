/**
 * Representa uno de los 4 "elementos" (cuadraditos) que componen una pieza.
 * Las coordenadas son relativas al origen/eje de rotación de la pieza,
 * no a la posición absoluta en el tablero.
 */
export class Square {
  private _x: number;
  private _y: number;

  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  getX(): number {
    return this._x;
  }

  setX(x: number): void {
    this._x = x;
  }

  getY(): number {
    return this._y;
  }

  setY(y: number): void {
    this._y = y;
  }

  equals(other: Square): boolean {
    return this._x === other.getX() && this._y === other.getY();
  }
}
