import { Square } from "../../src/models/Square";

describe("Square", () => {
  it("guarda las coordenadas x e y", () => {
    const s = new Square(2, 3);
    expect(s.getX()).toBe(2);
    expect(s.getY()).toBe(3);
  });

  it("compara igualdad por coordenadas", () => {
    const a = new Square(1, 1);
    const b = new Square(1, 1);
    const c = new Square(2, 1);
    expect(a.equals(b)).toBe(true);
    expect(a.equals(c)).toBe(false);
  });

  it("setX/setY permiten mover el square a otras coordenadas", () => {
    const s = new Square(0, 0);
    s.setX(5);
    s.setY(-3);
    expect(s.getX()).toBe(5);
    expect(s.getY()).toBe(-3);
  });
});
