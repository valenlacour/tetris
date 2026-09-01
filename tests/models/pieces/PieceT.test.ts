import { PieceT } from "../../../src/models/pieces/PieceT";

describe("PieceT", () => {
  it("se puede crear y tiene nombre T", () => {
    const piece = new PieceT();
    expect(piece).not.toBeNull();
    expect(piece.getName()).toBe("T");
  });

  it("está compuesta por exactamente 4 squares", () => {
    const piece = new PieceT();
    expect(piece.getSquares()).toHaveLength(4);
  });

  it("tiene la forma esperada de la T", () => {
    const piece = new PieceT();
    const coords = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    expect(coords).toEqual(
      expect.arrayContaining([
        [-1, 0],
        [0, 0],
        [1, 0],
        [0, 1],
      ])
    );
  });

  it("al rotar a la izquierda, sigue teniendo 4 squares", () => {
    const piece = new PieceT();
    piece.rotateLeft();
    expect(piece.getSquares()).toHaveLength(4);
  });

  it("rotar a la izquierda y luego a la derecha vuelve a la forma original", () => {
    const piece = new PieceT();
    const original = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    piece.rotateLeft();
    piece.rotateRight();
    const afterRoundTrip = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    expect(afterRoundTrip).toEqual(expect.arrayContaining(original));
  });
});
