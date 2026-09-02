import { PieceBase } from "../../src/models/PieceBase";
import { Square } from "../../src/models/Square";

// Pieza concreta mínima solo para poder testear la clase abstracta PieceBase.
class PieceTestDouble extends PieceBase {
  constructor(squares: Square[]) {
    super("TestDouble", squares);
  }

  renameTo(name: string): void {
    this.setName(name);
  }
}

describe("PieceBase", () => {
  it("se crea correctamente con exactamente 4 squares", () => {
    const piece = new PieceTestDouble([
      new Square(0, 0),
      new Square(1, 0),
      new Square(0, 1),
      new Square(1, 1),
    ]);
    expect(piece.getSquares()).toHaveLength(4);
  });

  it("lanza un error si se crea con menos de 4 squares", () => {
    expect(
      () => new PieceTestDouble([new Square(0, 0), new Square(1, 0)])
    ).toThrow("Una pieza debe estar compuesta por exactamente 4 squares");
  });

  it("lanza un error si se crea con más de 4 squares", () => {
    expect(
      () =>
        new PieceTestDouble([
          new Square(0, 0),
          new Square(1, 0),
          new Square(0, 1),
          new Square(1, 1),
          new Square(2, 2),
        ])
    ).toThrow("Una pieza debe estar compuesta por exactamente 4 squares");
  });

  it("setName (protegido) permite renombrar la pieza desde una subclase", () => {
    const piece = new PieceTestDouble([
      new Square(0, 0),
      new Square(1, 0),
      new Square(0, 1),
      new Square(1, 1),
    ]);
    piece.renameTo("Renombrada");
    expect(piece.getName()).toBe("Renombrada");
  });
});
