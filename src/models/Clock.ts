/**
 * Reloj lógico del juego. No maneja hora real, solo cuenta ticks de a 1,
 * como pide el enunciado ("Metodo tick del reloj (avanza). Contar de 1 el avance").
 */
export class Clock {
  private _ticks: number = 0;

  tick(): number {
    this.setTicks(this.getTicks() + 1);
    return this.getTicks();
  }

  getTicks(): number {
    return this._ticks;
  }

  setTicks(ticks: number): void {
    this._ticks = ticks;
  }

  reset(): void {
    this.setTicks(0);
  }
}
