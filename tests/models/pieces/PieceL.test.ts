import { PieceL } from "../../../src/models/pieces/PieceL";

describe("PieceL", () => {
  it("se puede crear y tiene nombre L", () => {
    const piece = new PieceL();
    expect(piece).not.toBeNull();
    expect(piece.getName()).toBe("L");
  });

  it("está compuesta por exactamente 4 squares", () => {
    const piece = new PieceL();
    expect(piece.getSquares()).toHaveLength(4);
  });

  describe("variante right", () => {
    it("tiene la forma esperada", () => {
      const piece = new PieceL("right");
      expect(piece.getVariant()).toBe("right");
      const coords = piece.getSquares().map((s) => [s.getX(), s.getY()]);
      expect(coords).toEqual(
        expect.arrayContaining([
          [0, -1],
          [0, 0],
          [0, 1],
          [1, 1],
        ])
      );
    });
  });

  describe("variante left", () => {
    it("tiene la forma esperada (especular a la right)", () => {
      const piece = new PieceL("left");
      expect(piece.getVariant()).toBe("left");
      const coords = piece.getSquares().map((s) => [s.getX(), s.getY()]);
      expect(coords).toEqual(
        expect.arrayContaining([
          [0, -1],
          [0, 0],
          [0, 1],
          [-1, 1],
        ])
      );
    });
  });

  it("setVariant() reconstruye las squares según la nueva variante", () => {
    const piece = new PieceL("right");
    piece.setVariant("left");
    expect(piece.getVariant()).toBe("left");
    const coords = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    expect(coords).toEqual(expect.arrayContaining([[-1, 1]]));
  });
});
