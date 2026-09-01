import { PieceBase } from "../PieceBase";
import { Square } from "../Square";

export type LVariant = "left" | "right";

const SHAPES_BY_VARIANT: Record<LVariant, () => Square[]> = {
  right: () => [
    new Square(0, -1),
    new Square(0, 0),
    new Square(0, 1),
    new Square(1, 1),
  ],
  left: () => [
    new Square(0, -1),
    new Square(0, 0),
    new Square(0, 1),
    new Square(-1, 1),
  ],
};

/**
 * La pieza L tiene dos variantes especulares (left y right, según el enunciado).
 * Se elige la variante al construir la pieza.
 */
export class PieceL extends PieceBase {
  private _variant: LVariant;

  constructor(variant: LVariant = "right") {
    super("L", SHAPES_BY_VARIANT[variant]());
    this._variant = variant;
  }

  getVariant(): LVariant {
    return this._variant;
  }

  setVariant(variant: LVariant): void {
    this._variant = variant;
    this.setSquares(SHAPES_BY_VARIANT[variant]());
  }
}
