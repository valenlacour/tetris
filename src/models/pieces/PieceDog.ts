import { PieceBase } from "../PieceBase";
import { Square } from "../Square";

export type DogVariant = "left" | "right";

const SHAPES_BY_VARIANT: Record<DogVariant, () => Square[]> = {
  right: () => [
    new Square(-1, 0),
    new Square(0, 0),
    new Square(0, -1),
    new Square(1, -1),
  ],
  left: () => [
    new Square(1, 0),
    new Square(0, 0),
    new Square(0, -1),
    new Square(-1, -1),
  ],
};

/**
 * La pieza Dog/Perro (conocida también como S/Z) tiene dos variantes
 * especulares (left y right, según el enunciado).
 */
export class PieceDog extends PieceBase {
  private _variant: DogVariant;

  constructor(variant: DogVariant = "right") {
    super("Dog", SHAPES_BY_VARIANT[variant]());
    this._variant = variant;
  }

  getVariant(): DogVariant {
    return this._variant;
  }

  setVariant(variant: DogVariant): void {
    this._variant = variant;
    this.setSquares(SHAPES_BY_VARIANT[variant]());
  }
}
