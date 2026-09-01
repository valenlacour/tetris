import { PieceDog } from "../../../src/models/pieces/PieceDog";

function coords(piece: PieceDog) {
  return piece.getSquares().map((s) => [s.getX() + 0, s.getY() + 0]);
}

describe("PieceDog — rotación", () => {
  describe("variante right", () => {
    it("rotateLeft() produce las coordenadas esperadas", () => {
      const piece = new PieceDog("right");
      piece.rotateLeft();
      expect(coords(piece)).toEqual(
        expect.arrayContaining([
          [0, -1],
          [0, 0],
          [1, 0],
          [1, 1],
        ])
      );
    });

    it("rotateRight() produce las coordenadas esperadas", () => {
      const piece = new PieceDog("right");
      piece.rotateRight();
      expect(coords(piece)).toEqual(
        expect.arrayContaining([
          [0, 1],
          [0, 0],
          [-1, 0],
          [-1, -1],
        ])
      );
    });

    it("rotar 4 veces a la izquierda vuelve al estado original", () => {
      const piece = new PieceDog("right");
      const original = coords(piece);
      piece.rotateLeft();
      piece.rotateLeft();
      piece.rotateLeft();
      piece.rotateLeft();
      expect(coords(piece)).toEqual(expect.arrayContaining(original));
    });
  });

  describe("variante left", () => {
    it("rotateLeft() produce las coordenadas esperadas", () => {
      const piece = new PieceDog("left");
      piece.rotateLeft();
      expect(coords(piece)).toEqual(
        expect.arrayContaining([
          [0, 1],
          [0, 0],
          [1, 0],
          [1, -1],
        ])
      );
    });

    it("rotateRight() produce las coordenadas esperadas", () => {
      const piece = new PieceDog("left");
      piece.rotateRight();
      expect(coords(piece)).toEqual(
        expect.arrayContaining([
          [0, -1],
          [0, 0],
          [-1, 0],
          [-1, 1],
        ])
      );
    });

    it("rotar 4 veces a la izquierda vuelve al estado original", () => {
      const piece = new PieceDog("left");
      const original = coords(piece);
      piece.rotateLeft();
      piece.rotateLeft();
      piece.rotateLeft();
      piece.rotateLeft();
      expect(coords(piece)).toEqual(expect.arrayContaining(original));
    });
  });
});
