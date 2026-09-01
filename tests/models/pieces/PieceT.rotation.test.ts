import { PieceT } from "../../../src/models/pieces/PieceT";

function coords(piece: PieceT) {
  return piece.getSquares().map((s) => [s.getX() + 0, s.getY() + 0]);
}

describe("PieceT — rotación", () => {
  it("rotateLeft() produce las coordenadas esperadas", () => {
    const piece = new PieceT();
    piece.rotateLeft();
    expect(coords(piece)).toEqual(
      expect.arrayContaining([
        [0, -1],
        [0, 0],
        [0, 1],
        [-1, 0],
      ])
    );
  });

  it("rotateRight() produce las coordenadas esperadas", () => {
    const piece = new PieceT();
    piece.rotateRight();
    expect(coords(piece)).toEqual(
      expect.arrayContaining([
        [0, 1],
        [0, 0],
        [0, -1],
        [1, 0],
      ])
    );
  });

  it("rotar 4 veces a la izquierda vuelve al estado original", () => {
    const piece = new PieceT();
    const original = coords(piece);
    piece.rotateLeft();
    piece.rotateLeft();
    piece.rotateLeft();
    piece.rotateLeft();
    expect(coords(piece)).toEqual(expect.arrayContaining(original));
  });
});
