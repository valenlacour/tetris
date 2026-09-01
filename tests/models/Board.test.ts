import { Board, BOARD_WIDTH, BOARD_HEIGHT } from "../../src/models/Board";

describe("Board", () => {
  it("tiene el formato 10x20", () => {
    const board = new Board();
    expect(board.getWidth()).toBe(BOARD_WIDTH);
    expect(board.getHeight()).toBe(BOARD_HEIGHT);
  });

  // Los siguientes tests son la guía de los "Mínimos test a entregar"
  // del enunciado. Bórrense el test.todo y escriban el test real
  // ANTES de implementar el método correspondiente en Board.ts (TDD).

  test.todo("se puede agregar una pieza completa al tablero");
  test.todo("no se puede agregar una pieza que sobrepase los límites del tablero");
  test.todo("al agregar una pieza, se puede rotar aleatoriamente antes de agregarla completa");
  test.todo("moveDown mueve la pieza actual una fila hacia abajo si puede");
  test.todo("moveDown fija la pieza si no puede seguir bajando");
  test.todo("lineCount refleja las líneas completas del tablero");
  test.todo("al completarse una línea, se remueve y el resto baja una fila");
  test.todo("isGameOver es true cuando no hay lugar para nuevas piezas");
});
