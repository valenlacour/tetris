import { PieceBase } from "../PieceBase";
import { Square } from "../Square";

export class PieceStick extends PieceBase {
  constructor() {
    super("Stick", [
      new Square(0, -1),
      new Square(0, 0),
      new Square(0, 1),
      new Square(0, 2),
    ]);
  }
}
