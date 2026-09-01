import { PieceStick } from "../../../src/models/pieces/PieceStick";

function coords(piece: PieceStick) {
  return piece.getSquares().map((s) => [s.getX() + 0, s.getY() + 0]);
}

describe("PieceStick — rotación", () => {
  it("rotateLeft() produce las coordenadas esperadas", () => {
    const piece = new PieceStick();
    piece.rotateLeft();
    expect(coords(piece)).toEqual(
      expect.arrayContaining([
        [1, 0],
        [0, 0],
        [-1, 0],
        [-2, 0],
      ])
    );
  });

  it("rotateRight() produce las coordenadas esperadas", () => {
    const piece = new PieceStick();
    piece.rotateRight();
    expect(coords(piece)).toEqual(
      expect.arrayContaining([
        [-1, 0],
        [0, 0],
        [1, 0],
        [2, 0],
      ])
    );
  });

  it("rotar 4 veces a la izquierda vuelve al estado original", () => {
    const piece = new PieceStick();
    const original = coords(piece);
    piece.rotateLeft();
    piece.rotateLeft();
    piece.rotateLeft();
    piece.rotateLeft();
    expect(coords(piece)).toEqual(expect.arrayContaining(original));
  });
});
