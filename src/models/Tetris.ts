import { Board } from "./Board";
import { Clock } from "./Clock";
import { IRotator } from "../interfaces/IRotator";

export type GameState = "not_started" | "playing" | "game_over";

/**
 * Clase orquestadora: conecta el Board con el Clock y expone
 * la API pública del juego (Requerimiento "Mínimos test a entregar" #8).
 */
export class Tetris implements IRotator {
  private _board: Board;
  private _clock: Clock;
  private _state: GameState = "not_started";
  private _linesToWin: number;

  constructor(linesToWin: number = 5) {
    this._board = new Board();
    this._clock = new Clock();
    this._linesToWin = linesToWin;
  }

  start(): void {
    this.setState("playing");
    // TODO: agregar la primera pieza al tablero (Board.addPiece)
  }

  getState(): GameState {
    return this._state;
  }

  setState(state: GameState): void {
    this._state = state;
  }

  getBoard(): Board {
    return this._board;
  }

  setBoard(board: Board): void {
    this._board = board;
  }

  getClock(): Clock {
    return this._clock;
  }

  setClock(clock: Clock): void {
    this._clock = clock;
  }

  getLinesToWin(): number {
    return this._linesToWin;
  }

  setLinesToWin(linesToWin: number): void {
    this._linesToWin = linesToWin;
  }

  rotateLeft(): void {
    this.getBoard().rotateCurrentLeft();
  }

  rotateRight(): void {
    this.getBoard().rotateCurrentRight();
  }

  /**
   * Avanza un tick del reloj y hace que el tablero juegue el movimiento
   * correspondiente (mover pieza actual hacia abajo, revisar líneas, etc.)
   * TODO (Mínimos test a entregar #8.c).
   */
  tick(): void {
    throw new Error("TODO: implementar tick siguiendo TDD");
  }
}
