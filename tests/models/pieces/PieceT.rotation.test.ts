import { PieceT } from "../../../src/models/pieces/PieceT";

describe("PieceT — rotación", () => {
  it("rotateLeft() produce las coordenadas esperadas", () => {
    const piece = new PieceT();
    piece.rotateLeft();
    const coords = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    expect(coords).toEqual(
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
    const coords = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    expect(coords).toEqual(
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
    const original = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    piece.rotateLeft();
    piece.rotateLeft();
    piece.rotateLeft();
    piece.rotateLeft();
    const afterFour = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    expect(afterFour).toEqual(expect.arrayContaining(original));
  });
});
