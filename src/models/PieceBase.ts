import { IRotator } from "../interfaces/IRotator";
import { Square } from "./Square";

/**
 * Clase base abstracta para todas las piezas del Tetris.
 * Cada pieza está compuesta por exactamente 4 Square, cuyas coordenadas
 * son relativas al eje de rotación de la pieza.
 */
export abstract class PieceBase implements IRotator {
  private _name: string;
  private _squares: Square[];

  constructor(name: string, squares: Square[]) {
    if (squares.length !== 4) {
      throw new Error("Una pieza debe estar compuesta por exactamente 4 squares");
    }
    this._name = name;
    this._squares = squares;
  }

  getName(): string {
    return this._name;
  }

  protected setName(name: string): void {
    this._name = name;
  }

  getSquares(): Square[] {
    // devolvemos copias para no exponer el arreglo interno
    return this._squares.map((s) => new Square(s.getX(), s.getY()));
  }

  protected setSquares(squares: Square[]): void {
    this._squares = squares;
  }

  /**
   * Rotación 90° antihoraria sobre el origen (eje de la pieza).
   * (x, y) -> (-y, x)
   */
  rotateLeft(): void {
    this.setSquares(this._squares.map((s) => new Square(-s.getY(), s.getX())));
  }

  /**
   * Rotación 90° horaria sobre el origen (eje de la pieza).
   * (x, y) -> (y, -x)
   */
  rotateRight(): void {
    this.setSquares(this._squares.map((s) => new Square(s.getY(), -s.getX())));
  }
}
