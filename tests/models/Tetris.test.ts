import { Tetris } from "../../src/models/Tetris";
import { Board, BOARD_WIDTH } from "../../src/models/Board";
import { Clock } from "../../src/models/Clock";
import { Square } from "../../src/models/Square";
import { PieceSquare } from "../../src/models/pieces/PieceSquare";

describe("Tetris", () => {
  it("se puede crear un juego", () => {
    const game = new Tetris();
    expect(game).not.toBeNull();
    expect(game.getState()).toBe("not_started");
  });

  it("start() pone el juego en estado playing y agrega la primera pieza al tablero", () => {
    const game = new Tetris();
    game.setRandom(() => 0);
    game.getBoard().setRandom(() => 0);
    game.start();
    expect(game.getState()).toBe("playing");
    expect(game.getBoard().getCurrentPiece()).not.toBeNull();
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

  it("getLinesCleared/setLinesCleared exponen el acumulado de líneas completadas", () => {
    const game = new Tetris();
    expect(game.getLinesCleared()).toBe(0);
    game.setLinesCleared(3);
    expect(game.getLinesCleared()).toBe(3);
  });

  it("getRandom/setRandom exponen la función usada para elegir la próxima pieza", () => {
    const game = new Tetris();
    const random = () => 0.5;
    game.setRandom(random);
    expect(game.getRandom()).toBe(random);
  });

  it("rotateLeft/rotateRight delegan al tablero sin romper si no hay pieza actual", () => {
    const game = new Tetris();
    expect(() => game.rotateLeft()).not.toThrow();
    expect(() => game.rotateRight()).not.toThrow();
  });

  it("tick() hace que la pieza actual se mueva un tick en el tablero", () => {
    const game = new Tetris();
    const board = game.getBoard();
    board.setRandom(() => 0);
    board.addPiece(new PieceSquare());
    game.setState("playing");
    const before = board.getCurrentPosition().getY();
    game.tick();
    expect(board.getCurrentPosition().getY()).toBe(before + 1);
    expect(game.getClock().getTicks()).toBe(1);
  });

  it("tick() avanza el reloj pero no juega el movimiento si el juego no está en playing", () => {
    const game = new Tetris();
    const board = game.getBoard();
    board.setRandom(() => 0);
    board.addPiece(new PieceSquare());
    const before = board.getCurrentPosition().getY();
    game.tick(); // estado sigue en "not_started"
    expect(board.getCurrentPosition().getY()).toBe(before);
    expect(game.getClock().getTicks()).toBe(1);
  });

  it("cuando la pieza actual se fija, el siguiente tick agrega una pieza nueva sin terminar el juego", () => {
    const game = new Tetris();
    game.setRandom(() => 0);
    const board = game.getBoard();
    board.setRandom(() => 0);
    game.setState("playing");
    game.tick(); // no hay currentPiece -> se trata como "fijada" y agrega la primera
    expect(game.getState()).toBe("playing");
    expect(board.getCurrentPiece()).not.toBeNull();
  });

  it("el juego termina (game_over) cuando el tablero no admite más piezas", () => {
    const game = new Tetris();
    game.setRandom(() => 0); // siempre elige PieceSquare
    const board = game.getBoard();
    board.setRandom(() => 0); // sin rotación, columna más a la izquierda
    board.setOccupiedCells([new Square(0, 0)]); // bloquea la esquina donde entraría la próxima pieza
    game.setState("playing");
    game.tick();
    expect(game.getState()).toBe("game_over");
  });

  it("el juego termina cuando se completan las líneas configuradas (linesToWin)", () => {
    const game = new Tetris(1);
    const board = game.getBoard();
    const fullRow = Array.from({ length: BOARD_WIDTH }, (_, x) => new Square(x, 5));
    board.setOccupiedCells(fullRow);
    game.setState("playing");
    game.tick();
    expect(game.getState()).toBe("win");
    expect(game.getLinesCleared()).toBe(1);
  });
});
