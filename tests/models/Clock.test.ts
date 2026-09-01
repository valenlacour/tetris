import { Clock } from "../../src/models/Clock";

describe("Clock", () => {
  it("arranca en 0 ticks", () => {
    const clock = new Clock();
    expect(clock.getTicks()).toBe(0);
  });

  it("tick() avanza de a 1 (no maneja hora)", () => {
    const clock = new Clock();
    expect(clock.tick()).toBe(1);
    expect(clock.tick()).toBe(2);
    expect(clock.tick()).toBe(3);
  });

  it("reset() vuelve el contador a 0", () => {
    const clock = new Clock();
    clock.tick();
    clock.tick();
    clock.reset();
    expect(clock.getTicks()).toBe(0);
  });
});
