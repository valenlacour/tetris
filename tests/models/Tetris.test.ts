import { Tetris } from "../../src/models/Tetris";

describe("Tetris", () => {
  it("se puede crear un juego", () => {
    const game = new Tetris();
    expect(game).not.toBeNull();
    expect(game.getState()).toBe("not_started");
  });

  it("start() pone el juego en estado playing", () => {
    const game = new Tetris();
    game.start();
    expect(game.getState()).toBe("playing");
  });

  // Guía de "Mínimos test a entregar" #8: bórrense el test.todo
  // y escriban el test real antes de implementar tick() (TDD).
  test.todo("tick() hace que la pieza actual se mueva un tick en el tablero");
  test.todo("el juego termina (game_over) cuando el tablero no admite más piezas");
  test.todo("el juego termina cuando se completan las líneas configuradas (linesToWin)");
});
