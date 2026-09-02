import { Tetris } from "../../src/models/Tetris";
import { Board } from "../../src/models/Board";
import { Clock } from "../../src/models/Clock";

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

  it("getBoard/setBoard exponen el tablero del juego", () => {
    const game = new Tetris();
    const board = new Board();
    game.setBoard(board);
    expect(game.getBoard()).toBe(board);
  });

  it("getClock/setClock exponen el reloj del juego", () => {
    const game = new Tetris();
    const clock = new Clock();
    game.setClock(clock);
    expect(game.getClock()).toBe(clock);
  });

  it("getLinesToWin/setLinesToWin exponen la condición de victoria", () => {
    const game = new Tetris();
    expect(game.getLinesToWin()).toBe(5);
    game.setLinesToWin(3);
    expect(game.getLinesToWin()).toBe(3);
  });

  it("rotateLeft/rotateRight delegan al tablero sin romper si no hay pieza actual", () => {
    const game = new Tetris();
    expect(() => game.rotateLeft()).not.toThrow();
    expect(() => game.rotateRight()).not.toThrow();
  });

  // Guía de "Mínimos test a entregar" #8: bórrense el test.todo
  // y escriban el test real antes de implementar tick() (TDD).
  test.todo("tick() hace que la pieza actual se mueva un tick en el tablero");
  test.todo("el juego termina (game_over) cuando el tablero no admite más piezas");
  test.todo("el juego termina cuando se completan las líneas configuradas (linesToWin)");

  it("tick todavía no está implementado (Épica 6)", () => {
    const game = new Tetris();
    expect(() => game.tick()).toThrow();
  });
});
