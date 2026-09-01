import { PieceStick } from "../../../src/models/pieces/PieceStick";

describe("PieceStick", () => {
  it("se puede crear y tiene nombre Stick", () => {
    const piece = new PieceStick();
    expect(piece).not.toBeNull();
    expect(piece.getName()).toBe("Stick");
  });

  it("está compuesta por exactamente 4 squares", () => {
    const piece = new PieceStick();
    expect(piece.getSquares()).toHaveLength(4);
  });

  it("tiene la forma esperada del palo (columna vertical)", () => {
    const piece = new PieceStick();
    const coords = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    expect(coords).toEqual(
      expect.arrayContaining([
        [0, -1],
        [0, 0],
        [0, 1],
        [0, 2],
      ])
    );
  });

  it("al rotar a la izquierda, sigue teniendo 4 squares", () => {
    const piece = new PieceStick();
    piece.rotateLeft();
    expect(piece.getSquares()).toHaveLength(4);
  });

  it("rotar a la izquierda y luego a la derecha vuelve a la forma original", () => {
    const piece = new PieceStick();
    const original = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    piece.rotateLeft();
    piece.rotateRight();
    const afterRoundTrip = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    expect(afterRoundTrip).toEqual(expect.arrayContaining(original));
  });
});
