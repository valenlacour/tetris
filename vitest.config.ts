import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.ts"],
      // IRotator.ts es una interfaz pura (sin codigo ejecutable en runtime);
      // pedirle cobertura no tiene sentido y arrastraba el promedio general.
      exclude: ["src/interfaces/**"],
      thresholds: {
        statements: 90,
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
  },
});
