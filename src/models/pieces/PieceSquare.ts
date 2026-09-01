import { PieceBase } from "../PieceBase";
import { Square } from "../Square";

export class PieceSquare extends PieceBase {
  constructor() {
    super("Square", [
      new Square(0, 0),
      new Square(1, 0),
      new Square(0, 1),
      new Square(1, 1),
    ]);
  }

  // El cuadrado es simétrico: la rotación no cambia su forma.
  rotateLeft(): void {}
  rotateRight(): void {}
}
