# Tetris con POO vía TDD

Esqueleto inicial para el TP de Paradigmas y Lenguajes de Programación II
(Escenario AE1 - Tetris, UCP 2026).

## Cómo arrancar

```bash
npm install
npm test              # corre todos los tests una vez
npm run test:watch    # modo watch, útil para TDD (rojo -> verde -> refactor)
npm run test:coverage # corre tests + reporte de cobertura (umbral: 90%)
```

> Usamos **Vitest** (no Jest). La API de `describe`/`it`/`expect`/`test.todo`
> es prácticamente idéntica, así que no cambia la forma de escribir tests.

## Estructura

```
src/
  interfaces/
    IRotator.ts       # contrato rotateLeft() / rotateRight()
  models/
    Square.ts         # unidad mínima (x, y) - YA IMPLEMENTADA
    PieceBase.ts       # clase abstracta, rotación genérica - YA IMPLEMENTADA
    pieces/
      PieceT.ts        # YA IMPLEMENTADA (referencia)
      PieceSquare.ts   # YA IMPLEMENTADA (caso simétrico)
      PieceStick.ts    # YA IMPLEMENTADA
      PieceL.ts        # YA IMPLEMENTADA (variantes left/right)
      PieceDog.ts      # YA IMPLEMENTADA (variantes left/right)
    Clock.ts           # YA IMPLEMENTADA
    Board.ts           # ESQUELETO - completar vía TDD
    Tetris.ts          # ESQUELETO - completar vía TDD
tests/
  ... (misma estructura, con tests ya escritos o test.todo como guía)
```

## Qué ya está resuelto

Las piezas, `Square`, `PieceBase` (con rotación) y `Clock` están implementadas
como punto de partida y para que vean el patrón de código/tests esperado.
Revísenlas y agréguenles más tests si quieren subir la cobertura de esa parte
(por ejemplo, tests de forma para `PieceStick`, `PieceL` y `PieceDog`, que
todavía no tienen).

## Qué falta (a hacer en equipo, vía TDD)

Los métodos de `Board.ts` y `Tetris.ts` tiran `throw new Error("TODO...")`.
Antes de programarlos:

1. Vayan a `tests/models/Board.test.ts` o `tests/models/Tetris.test.ts`.
2. Reemplacen el `test.todo(...)` correspondiente por un test real que
   describa el comportamiento esperado (rojo).
3. Implementen el método mínimo necesario en `Board.ts`/`Tetris.ts` para que pase (verde).
4. Refactoricen si hace falta.
5. Repitan con el siguiente `test.todo`.

## Workflow de Git (trabajo por branches)

**Regla base: nadie commitea directo a `main`.** Cada funcionalidad se hace en su propia branch y se mergea a `main` vía Pull Request (aunque sea auto-aprobado entre ustedes, así queda registro).

Convención de nombres:

```
feature/piece-base      # PieceBase + Square + IRotator
feature/pieces          # PieceT, PieceSquare, PieceStick, PieceL, PieceDog
feature/board           # Board.ts (colisión, límites, líneas completas)
feature/clock           # Clock.ts
feature/tetris          # Tetris.ts (orquestación)
fix/nombre-del-bug      # para arreglos puntuales
```

Flujo típico para arrancar una branch nueva:

```bash
git checkout main
git pull origin main            # traer lo último antes de ramificar
git checkout -b feature/piece-base
# ... trabajar, hacer commits chicos y frecuentes ...
git push -u origin feature/piece-base
# luego abrir el Pull Request en GitHub hacia main
```

Commits: mensajes cortos y en presente, ej. `test: agrega test de forma para PieceT`,
`feat: implementa rotateLeft en PieceBase`. Ayuda mucho a la hora de escribir
el informe grupal (quién hizo qué).



- **Persona A - Piezas**: sumar tests de forma/rotación que falten
  (`PieceStick`, `PieceL`, `PieceDog`), y casos límite de `PieceBase`.
- **Persona B - Tablero**: completar `Board.ts` siguiendo los `test.todo`
  (agregar pieza, límites, colisión, líneas completas, game over).
- **Persona C - Reloj y orquestación**: completar `Tetris.ts` (`tick()`,
  integración con `Board` y `Clock`, condición de victoria).

Acuerden las firmas de los métodos el primer día (ya están en los esqueletos)
para poder trabajar en paralelo sin pisarse.

## Checklist de entrega

- [ ] Repo grupal en GitHub con historial de commits de los 3 integrantes
- [ ] Todos los tests pasando (`npm test`)
- [ ] Cobertura >= 90% (`npm run test:coverage`, provider v8 de Vitest)
- [ ] Informe grupal en normas APA con el aporte de cada integrante
