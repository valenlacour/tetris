import { PieceBase } from "./PieceBase";
import { Square } from "./Square";

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

type RandomFn = () => number;

/**
 * Tablero del Tetris. Contiene las piezas ya fijadas y la pieza actual
 * (la que está descendiendo).
 */
export class Board {
  private _width: number = BOARD_WIDTH;
  private _height: number = BOARD_HEIGHT;
  private _pieces: PieceBase[] = [];
  private _currentPiece: PieceBase | null = null;
  private _currentPosition: Square = new Square(0, 0);
  private _occupiedCells: Square[] = [];
  private _random: RandomFn = Math.random;
  private _gameOver: boolean = false;

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

  getOccupiedCells(): Square[] {
    return this._occupiedCells;
  }

  setOccupiedCells(cells: Square[]): void {
    this._occupiedCells = cells;
  }

  getRandom(): RandomFn {
    return this._random;
  }

  setRandom(random: RandomFn): void {
    this._random = random;
  }

  getGameOver(): boolean {
    return this._gameOver;
  }

  setGameOver(gameOver: boolean): void {
    this._gameOver = gameOver;
  }

  /**
   * Agrega una pieza nueva: la rota una cantidad aleatoria de veces,
   * elige una columna aleatoria válida en la primera fila y la coloca.
   * Si no entra, el juego termina (Requerimiento 4).
   */
  addPiece(piece: PieceBase): boolean {
    if (this._gameOver) return false;
    this.applyRandomRotation(piece);
    const position = new Square(this.randomOffsetX(piece), this.topOffsetY(piece));
    if (!this.canPlace(piece, position)) {
      this.setGameOver(true);
      return false;
    }
    this.setCurrentPiece(piece);
    this.setCurrentPosition(position);
    this.setPieces([...this._pieces, piece]);
    return true;
  }

  /**
   * Intenta mover la pieza actual una fila hacia abajo.
   * Si no puede, la fija en el tablero (Requerimiento 3 y 4).
   */
  moveDown(): boolean {
    if (!this._currentPiece) return false;
    const next = new Square(this._currentPosition.getX(), this._currentPosition.getY() + 1);
    if (this.canPlace(this._currentPiece, next)) {
      this.setCurrentPosition(next);
      return true;
    }
    this.fixCurrentPiece();
    return false;
  }

  /**
   * Rota la pieza actual a la izquierda; deshace la rotación si no entra.
   */
  rotateCurrentLeft(): boolean {
    return this.tryRotate(
      () => this._currentPiece?.rotateLeft(),
      () => this._currentPiece?.rotateRight()
    );
  }

  /**
   * Rota la pieza actual a la derecha; deshace la rotación si no entra.
   */
  rotateCurrentRight(): boolean {
    return this.tryRotate(
      () => this._currentPiece?.rotateRight(),
      () => this._currentPiece?.rotateLeft()
    );
  }

  /**
   * Devuelve cuántas líneas están completas actualmente.
   * TODO (Épica 5 / Requerimiento 5): no forma parte de esta entrega.
   */
  lineCount(): number {
    throw new Error("TODO: implementar lineCount siguiendo TDD");
  }

  /**
   * Elimina las líneas completas y baja el resto de las celdas.
   * TODO (Épica 5 / Requerimiento 5): no forma parte de esta entrega.
   */
  clearCompletedLines(): number {
    throw new Error("TODO: implementar clearCompletedLines siguiendo TDD");
  }

  /**
   * Indica si el juego terminó (no entran más piezas en el tablero).
   */
  isGameOver(): boolean {
    return this._gameOver;
  }

  private applyRandomRotation(piece: PieceBase): void {
    const times = Math.floor(this._random() * 4);
    for (let i = 0; i < times; i++) {
      piece.rotateLeft();
    }
  }

  private randomOffsetX(piece: PieceBase): number {
    const xs = piece.getSquares().map((s) => s.getX());
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const rangeSize = this._width - (maxX - minX);
    return -minX + Math.floor(this._random() * rangeSize);
  }

  private topOffsetY(piece: PieceBase): number {
    const minY = Math.min(...piece.getSquares().map((s) => s.getY()));
    return -minY;
  }

  private canPlace(piece: PieceBase, position: Square): boolean {
    return piece.getSquares().every((s) => this.isFreeCell(position.getX() + s.getX(), position.getY() + s.getY()));
  }

  private isFreeCell(x: number, y: number): boolean {
    const inBounds = x >= 0 && x < this._width && y >= 0 && y < this._height;
    if (!inBounds) return false;
    return !this._occupiedCells.some((c) => c.getX() === x && c.getY() === y);
  }

  private fixCurrentPiece(): void {
    if (!this._currentPiece) return;
    const fixedCells = this._currentPiece
      .getSquares()
      .map((s) => new Square(this._currentPosition.getX() + s.getX(), this._currentPosition.getY() + s.getY()));
    this.setOccupiedCells([...this._occupiedCells, ...fixedCells]);
    this.setCurrentPiece(null);
  }

  private tryRotate(apply: () => void, undo: () => void): boolean {
    if (!this._currentPiece) return false;
    apply();
    if (this.canPlace(this._currentPiece, this._currentPosition)) return true;
    undo();
    return false;
  }
}