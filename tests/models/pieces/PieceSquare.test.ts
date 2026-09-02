import { PieceSquare } from "../../../src/models/pieces/PieceSquare";

describe("PieceSquare", () => {
  it("se puede crear y tiene nombre Square", () => {
    const piece = new PieceSquare();
    expect(piece).not.toBeNull();
    expect(piece.getName()).toBe("Square");
  });

  it("está compuesta por exactamente 4 squares", () => {
    const piece = new PieceSquare();
    expect(piece.getSquares()).toHaveLength(4);
  });

  it("no cambia de forma al rotar (pieza simétrica)", () => {
    const piece = new PieceSquare();
    const before = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    piece.rotateLeft();
    const after = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    expect(after).toEqual(before);
  });

  it("tampoco cambia de forma al rotar a la derecha (pieza simétrica)", () => {
    const piece = new PieceSquare();
    const before = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    piece.rotateRight();
    const after = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    expect(after).toEqual(before);
  });
});
