import { PieceBase } from "./PieceBase";
import { Square } from "./Square";

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

/**
 * Tablero del Tetris. Contiene las piezas ya fijadas y la pieza actual
 * (la que está descendiendo). La lógica de colisión, líneas completas
 * y fin de juego se completa vía TDD (Requerimientos 3, 4 y 5).
 */
export class Board {
  private _width: number = BOARD_WIDTH;
  private _height: number = BOARD_HEIGHT;
  private _pieces: PieceBase[] = [];
  private _currentPiece: PieceBase | null = null;
  private _currentPosition: Square = new Square(0, 0);

  getWidth(): number {
    return this._width;
  }

  setWidth(width: number): void {
    this._width = width;
  }

  getHeight(): number {
    return this._height;
  }

  setHeight(height: number): void {
    this._height = height;
  }

  getPieces(): PieceBase[] {
    return this._pieces;
  }

  setPieces(pieces: PieceBase[]): void {
    this._pieces = pieces;
  }

  getCurrentPiece(): PieceBase | null {
    return this._currentPiece;
  }

  setCurrentPiece(piece: PieceBase | null): void {
    this._currentPiece = piece;
  }

  getCurrentPosition(): Square {
    return this._currentPosition;
  }

  setCurrentPosition(position: Square): void {
    this._currentPosition = position;
  }

  /**
   * Agrega una pieza nueva en una columna aleatoria de la primera fila.
   * TODO (Requerimiento 3):
   *  - Elegir columna aleatoria válida (la pieza completa debe entrar).
   *  - Verificar que no se pueda colocar una pieza fuera del tablero.
   *  - Si no hay lugar en la primera fila -> el juego termina (Requerimiento 4).
   */
  addPiece(piece: PieceBase): boolean {
    throw new Error("TODO: implementar addPiece siguiendo TDD");
  }

  /**
   * Intenta mover la pieza actual una fila hacia abajo.
   * TODO (Requerimiento 3 y 4):
   *  - Si puede bajar, actualizar posición y devolver true.
   *  - Si no puede (choca con el fondo u otra pieza), fijar la pieza
   *    en el tablero y devolver false (Requerimiento 4: detener movimiento).
   */
  moveDown(): boolean {
    throw new Error("TODO: implementar moveDown siguiendo TDD");
  }

  /**
   * Rota la pieza actual, solo si el nuevo estado cabe en el tablero.
   * TODO (Requerimiento 2): validar límites antes de aplicar la rotación.
   */
  rotateCurrentLeft(): boolean {
    throw new Error("TODO: implementar rotateCurrentLeft siguiendo TDD");
  }

  rotateCurrentRight(): boolean {
    throw new Error("TODO: implementar rotateCurrentRight siguiendo TDD");
  }

  /**
   * Devuelve cuántas líneas están completas actualmente.
   */
  lineCount(): number {
    throw new Error("TODO: implementar lineCount siguiendo TDD");
  }

  /**
   * Elimina las líneas completas y baja el resto de las celdas.
   * TODO (Requerimiento 5).
   */
  clearCompletedLines(): number {
    throw new Error("TODO: implementar clearCompletedLines siguiendo TDD");
  }

  /**
   * Indica si el juego terminó (no entran más piezas en el tablero).
   * TODO (Requerimiento 4).
   */
  isGameOver(): boolean {
    throw new Error("TODO: implementar isGameOver siguiendo TDD");
  }
}
