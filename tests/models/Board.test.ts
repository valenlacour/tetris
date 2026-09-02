import { Board, BOARD_WIDTH, BOARD_HEIGHT } from "../../src/models/Board";
import { Square } from "../../src/models/Square";
import { PieceSquare } from "../../src/models/pieces/PieceSquare";
import { PieceT } from "../../src/models/pieces/PieceT";
import { PieceStick } from "../../src/models/pieces/PieceStick";

describe("Board", () => {
  it("tiene el formato 10x20", () => {
    const board = new Board();
    expect(board.getWidth()).toBe(BOARD_WIDTH);
    expect(board.getHeight()).toBe(BOARD_HEIGHT);
  });

  it("se puede agregar una pieza completa al tablero", () => {
    const board = new Board();
    board.setRandom(() => 0);
    const piece = new PieceSquare();
    const added = board.addPiece(piece);
    expect(added).toBe(true);
    expect(board.getCurrentPiece()).toBe(piece);
    expect(board.getCurrentPosition().getX()).toBe(0);
    expect(board.getCurrentPosition().getY()).toBe(0);
  });

  it("no se puede agregar una pieza que sobrepase los límites del tablero", () => {
    const board = new Board();
    board.setRandom(() => 0.999999);
    const piece = new PieceT();
    board.addPiece(piece);
    const position = board.getCurrentPosition();
    const cells = piece.getSquares().map((s) => ({ x: position.getX() + s.getX(), y: position.getY() + s.getY() }));
    for (const cell of cells) {
      expect(cell.x).toBeGreaterThanOrEqual(0);
      expect(cell.x).toBeLessThan(BOARD_WIDTH);
      expect(cell.y).toBeGreaterThanOrEqual(0);
      expect(cell.y).toBeLessThan(BOARD_HEIGHT);
    }
  });

  it("al agregar una pieza, se puede rotar aleatoriamente antes de agregarla completa", () => {
    const board = new Board();
    board.setRandom(() => 0.5); // floor(0.5 * 4) = 2 rotaciones
    const piece = new PieceT();
    board.addPiece(piece);
    const coords = piece.getSquares().map((s) => [s.getX(), s.getY()]);
    expect(coords).toEqual(
      expect.arrayContaining([
        [1, 0],
        [0, 0],
        [-1, 0],
        [0, -1],
      ])
    );
  });

  it("moveDown mueve la pieza actual una fila hacia abajo si puede", () => {
    const board = new Board();
    board.setRandom(() => 0);
    board.addPiece(new PieceSquare());
    const moved = board.moveDown();
    expect(moved).toBe(true);
    expect(board.getCurrentPosition().getY()).toBe(1);
    expect(board.getCurrentPiece()).not.toBeNull();
  });

  it("moveDown fija la pieza si no puede seguir bajando", () => {
    const board = new Board();
    board.setRandom(() => 0);
    board.addPiece(new PieceSquare());
    for (let i = 0; i < BOARD_HEIGHT; i++) {
      board.moveDown();
    }
    expect(board.getCurrentPiece()).toBeNull();
    expect(board.getOccupiedCells().length).toBe(4);
  });

  it("rotateCurrentLeft rota la pieza actual", () => {
    const board = new Board();
    board.setRandom(() => 0);
    board.addPiece(new PieceT());
    board.moveDown(); // libera espacio arriba para poder rotar
    const before = board.getCurrentPiece()!.getSquares().map((s) => [s.getX(), s.getY()]);
    const rotated = board.rotateCurrentLeft();
    expect(rotated).toBe(true);
    const after = board.getCurrentPiece()!.getSquares().map((s) => [s.getX(), s.getY()]);
    expect(after).not.toEqual(before);
  });

  it("deshace la rotación si la pieza no entra en el tablero", () => {
    const board = new Board();
    board.setRandom(() => 0); // Stick queda pegado a la columna 0
    board.addPiece(new PieceStick());
    const before = board.getCurrentPiece()!.getSquares().map((s) => [s.getX(), s.getY()]);
    const rotated = board.rotateCurrentRight(); // se volvería horizontal y saldría por la izquierda
    expect(rotated).toBe(false);
    const after = board.getCurrentPiece()!.getSquares().map((s) => [s.getX(), s.getY()]);
    expect(after).toEqual(before);
  });

  it("lineCount refleja las líneas completas del tablero", () => {
    const board = new Board();
    expect(board.lineCount()).toBe(0);
    const fullRow = Array.from({ length: BOARD_WIDTH }, (_, x) => new Square(x, 7));
    const partialRow = Array.from({ length: BOARD_WIDTH - 1 }, (_, x) => new Square(x, 12));
    board.setOccupiedCells([...fullRow, ...partialRow]);
    expect(board.lineCount()).toBe(1);
  });

  it("al completarse una línea, se remueve y el resto baja una fila", () => {
    const board = new Board();
    const fullRow = Array.from({ length: BOARD_WIDTH }, (_, x) => new Square(x, 10));
    const cellAbove = new Square(3, 9);
    board.setOccupiedCells([...fullRow, cellAbove]);
    const cleared = board.clearCompletedLines();
    expect(cleared).toBe(1);
    const cells = board.getOccupiedCells();
    expect(cells.length).toBe(1);
    expect(cells[0].getX()).toBe(3);
    expect(cells[0].getY()).toBe(10);
    expect(board.lineCount()).toBe(0);
  });

  it("clearCompletedLines con varias líneas completas desplaza correctamente lo que queda arriba", () => {
    const board = new Board();
    const row10 = Array.from({ length: BOARD_WIDTH }, (_, x) => new Square(x, 10));
    const row15 = Array.from({ length: BOARD_WIDTH }, (_, x) => new Square(x, 15));
    const above = new Square(5, 5); // por encima de ambas -> baja 2
    const between = new Square(2, 12); // entre las dos -> baja 1
    board.setOccupiedCells([...row10, ...row15, above, between]);
    const cleared = board.clearCompletedLines();
    expect(cleared).toBe(2);
    const cells = board.getOccupiedCells();
    expect(cells.length).toBe(2);
    const positions = cells.map((c) => [c.getX(), c.getY()]);
    expect(positions).toEqual(expect.arrayContaining([[5, 7]]));
    expect(positions).toEqual(expect.arrayContaining([[2, 13]]));
  });

  it("isGameOver es true cuando no hay lugar para nuevas piezas", () => {
    const board = new Board();
    board.setRandom(() => 0);
    const fullTopRow = Array.from({ length: BOARD_WIDTH }, (_, x) => new Square(x, 0));
    board.setOccupiedCells(fullTopRow);
    const added = board.addPiece(new PieceSquare());
    expect(added).toBe(false);
    expect(board.isGameOver()).toBe(true);
  });

  it("una vez terminado el juego, addPiece no agrega más piezas aunque se libere espacio", () => {
    const board = new Board();
    board.setGameOver(true);
    const added = board.addPiece(new PieceSquare());
    expect(added).toBe(false);
    expect(board.getCurrentPiece()).toBeNull();
  });

  it("getWidth/setWidth y getHeight/setHeight exponen el tamaño configurable del tablero", () => {
    const board = new Board();
    board.setWidth(12);
    board.setHeight(24);
    expect(board.getWidth()).toBe(12);
    expect(board.getHeight()).toBe(24);
  });

  it("getPieces devuelve las piezas agregadas al tablero", () => {
    const board = new Board();
    board.setRandom(() => 0);
    const piece = new PieceSquare();
    board.addPiece(piece);
    expect(board.getPieces()).toContain(piece);
  });

  it("getRandom/setRandom exponen la función de aleatoriedad inyectada", () => {
    const board = new Board();
    const random = () => 0.42;
    board.setRandom(random);
    expect(board.getRandom()).toBe(random);
  });

  it("getGameOver refleja el estado de fin de juego", () => {
    const board = new Board();
    expect(board.getGameOver()).toBe(false);
    board.setGameOver(true);
    expect(board.getGameOver()).toBe(true);
  });
});