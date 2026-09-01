import { PieceDog } from "../../../src/models/pieces/PieceDog";

describe("PieceDog", () => {
  it("se puede crear y tiene nombre Dog", () => {
    const piece = new PieceDog();
    expect(piece).not.toBeNull();
    expect(piece.getName()).toBe("Dog");
  });

  it("está compuesta por exactamente 4 squares", () => {
    const piece = new PieceDog();
    expect(piece.getSquares()).toHaveLength(4);
  });

  describe("variante right", () => {
    it("tiene la forma esperada", () => {
      const piece = new PieceDog("right");
      expect(piece.getVariant()).toBe("right");
      const coords = piece.getSquares().map((s) => [s.getX(), s.getY()]);
      expect(coords).toEqual(
        expect.arrayContaining([
          [-1, 0],
          [0, 0],
          [0, -1],
          [1, -1],
        ])
      );
    });
  });

  describe("variante left", () => {
    it("tiene la forma esperada (especular a la right)", () => {
      const piece = new PieceDog("left");
      expect(piece.getVariant()).toBe("left");
      const coords = piece.getSquares().map((s) => [s.getX(), s.getY()]);
      expect(coords).toEqual(
        expect.arrayContaining([
          [1, 0],
          [0, 0],
          [0, -1],
          [-1, -1],
        ])
      );
    });
  });

  it("setVariant() reconstruye las squares según la nueva variante", () => {
    const piece = new PieceDog("right");
    piece.setVariant("left");
    expect(piece.getVariant()).toBe("left");
    const coords = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    expect(coords).toEqual(expect.arrayContaining([[-1, -1]]));
  });
});
