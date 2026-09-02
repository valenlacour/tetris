import { Board } from "./Board";
import { Clock } from "./Clock";
import { IRotator } from "../interfaces/IRotator";
import { PieceBase } from "./PieceBase";
import { PieceSquare } from "./pieces/PieceSquare";
import { PieceT } from "./pieces/PieceT";
import { PieceStick } from "./pieces/PieceStick";
import { PieceL } from "./pieces/PieceL";
import { PieceDog } from "./pieces/PieceDog";

export type GameState = "not_started" | "playing" | "game_over" | "win";

type RandomFn = () => number;
type PieceFactory = () => PieceBase;

/**
 * Clase orquestadora: conecta el Board con el Clock y expone
 * la API pública del juego (Requerimiento "Mínimos test a entregar" #8).
 */
export class Tetris implements IRotator {
  private _board: Board;
  private _clock: Clock;
  private _state: GameState = "not_started";
  private _linesToWin: number;
  private _linesCleared: number = 0;
  private _random: RandomFn = Math.random;

  // Tabla de despacho de las piezas disponibles: agregar una pieza nueva al
  // juego es agregar una entrada acá, sin tocar la lógica de selección.
  // No es "estado" (no cambia en tiempo de ejecución), así que no forma
  // parte del doble encapsulamiento como sí lo son _board/_clock/etc.
  private readonly _pieceFactories: PieceFactory[] = [
    () => new PieceSquare(),
    () => new PieceT(),
    () => new PieceStick(),
    () => new PieceL(),
    () => new PieceDog(),
  ];

  constructor(linesToWin: number = 5) {
    this._board = new Board();
    this._clock = new Clock();
    this._linesToWin = linesToWin;
  }

  /**
   * Pone el juego en marcha: cambia el estado a "playing" y agrega la
   * primera pieza al tablero.
   */
  start(): void {
    this.setState("playing");
    this.getBoard().addPiece(this.randomPiece());
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

  getLinesCleared(): number {
    return this._linesCleared;
  }

  setLinesCleared(linesCleared: number): void {
    this._linesCleared = linesCleared;
  }

  getRandom(): RandomFn {
    return this._random;
  }

  setRandom(random: RandomFn): void {
    this._random = random;
  }

  rotateLeft(): void {
    this.getBoard().rotateCurrentLeft();
  }

  rotateRight(): void {
    this.getBoard().rotateCurrentRight();
  }

  /**
   * Avanza un tick del reloj y hace que el tablero juegue el movimiento
   * correspondiente: baja la pieza actual, y si ya no puede bajar más,
   * la fija, revisa líneas completas y decide si el juego sigue, termina
   * en game_over o se gana (Mínimos test a entregar #8.c).
   */
  tick(): void {
    this.getClock().tick();
    if (this._state === "playing") this.playMovement();
  }

  private playMovement(): void {
    const moved = this.getBoard().moveDown();
    if (!moved) this.afterPieceFixed();
  }

  private afterPieceFixed(): void {
    this.setLinesCleared(this.getLinesCleared() + this.getBoard().clearCompletedLines());
    if (this.hasWon()) return this.setState("win");
    this.spawnNextPiece();
  }

  private hasWon(): boolean {
    return this.getLinesCleared() >= this.getLinesToWin();
  }

  private spawnNextPiece(): void {
    this.getBoard().addPiece(this.randomPiece());
    if (this.getBoard().isGameOver()) this.setState("game_over");
  }

  private randomPiece(): PieceBase {
    const index = Math.floor(this._random() * this._pieceFactories.length);
    return this._pieceFactories[index]();
  }
}
