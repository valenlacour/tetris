import { PieceBase } from "../PieceBase";
import { Square } from "../Square";

export class PieceT extends PieceBase {
  constructor() {
    super("T", [
      new Square(-1, 0),
      new Square(0, 0),
      new Square(1, 0),
      new Square(0, 1),
    ]);
  }
}
