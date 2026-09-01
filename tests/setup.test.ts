import { Tetris } from "../src/models/Tetris";

describe("Preparar entorno", () => {
  it("puede crear una instancia de Tetris (Pasos para validar del enunciado)", () => {
    const t = new Tetris();
    expect(t).not.toBeNull();
  });
});
