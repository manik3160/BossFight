# You Are the Final Boss

A dark fantasy browser game foundation: configure a Warden, enter its arena, and defeat your creation. Original procedural pixel graphics; no external game assets or backend.

## Run locally

Requires Node.js 22.13+ (tested with Node 24) and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Choose **Play Demo** for the default fight, or **Create Boss** to adjust name, health, damage, and wind-up. The forge is an intentionally small, working editor for one boss archetype. Configuration survives navigation within this session but is not persisted after reloading.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

The build creates `out/`, a static export that can be hosted without a Node server. `npm start` serves that directory; use the URL printed by `serve`. The first four checks need no external services after dependencies are installed. Phaser is imported only inside the mounted client battle component.

## Controls

| Action  | Keyboard                 | Touch                 |
| ------- | ------------------------ | --------------------- |
| Move    | A/D or left/right arrows | Hold arrows           |
| Jump    | Space, W, up arrow       | Tap Jump              |
| Sword   | J or X                   | Tap Strike            |
| Dash    | Shift or K               | Tap Dash              |
| Pause   | Esc or P                 | Pause / Resume button |
| Restart | Restart button           | Restart button        |

Click the arena or use a touch control to focus it. Actions are edge triggered; release and press again for another jump, sword swing, or dash. Touch accepts multiple simultaneous pointers. Landscape is recommended on mobile. Browser focus loss or a hidden tab pauses the game and clears input. Resume explicitly to continue.

## Fighting the Warden

Close the distance and face the boss. The crimson ground marker warns where the heavy slash will land; the Warden commits to its facing direction during the wind-up. Jump above its low blade, dash through the attack, or retreat. Strike during recovery. Damage and dash grant temporary invulnerability. The HUD shows HP, time, the current attack cue, and dash readiness.

## Architecture

- `src/app/`: App Router entry, metadata, Tailwind import and charcoal/crimson/gold design tokens.
- `src/components/Game.tsx`: landing, local forge and navigation.
- `src/components/Battle.tsx`: Phaser lifecycle, accessible DOM HUD, controls and pause/result overlays.
- `src/game/combat.ts`: Zod configuration, centralized balance, deterministic state and one-tick update. No Phaser, DOM, random numbers or wall-clock reads.
- `src/game/input.ts`: keyboard/pointer action mapping and one-shot input sampling.
- `src/game/scene.ts`: fixed-step accumulator and procedural arena rendering.
- `src/game/*.test.ts`: simulation and input regression tests.
- `scripts/dev.mjs`: runs Next.js locally and serves the static production export for managed preview.
- `docs/implementation-report.md`: delivery scope, validation and limitations.

The simulation advances at 60 Hz. Movement and cooldown values are per tick. Rendering may run at a different frequency; a frame delta is capped at 100 ms to prevent an unbounded catch-up loop after a stall. Paused time is discarded. HUD snapshots update at most 10 times per simulation second, with an immediate terminal result. React never owns the per-frame simulation state. Replay determinism assumes identical initial configuration and tick-indexed input; this is not a network lockstep implementation.

Victory wins ties because hero strikes resolve before boss attacks. Recovery damage briefly staggers the boss; telegraph and slash remain committed to prevent stun-lock. Restart constructs fresh simulation and Phaser instances. Cleanup removes keyboard, visibility, focus and resize listeners, clears input and destroys the game; async imports are cancellation guarded for React Strict Mode.

## Scope

Task 01 is one playable arena, one hero, one configurable boss, and local verification by victory. A modular boss composition system, persistence, exports, shared challenges, sound, authentication, leaderboards and multiplayer are not implemented. The landing page labels sharing as future work and does not provide an inactive sharing button.

## Manual browser acceptance checklist

1. Launch locally and open DevTools: verify no hydration or application errors.
2. Open Create Boss, change values, reset, and launch the configured trial.
3. Move left/right, jump, strike, and dash; verify cooldowns and health.
4. Pause with Esc, resume, switch tabs, and confirm returning requires explicit resume.
5. Defeat the Warden, restart, then allow the Warden to defeat you and restart again.
6. Leave/re-enter repeatedly; verify only one canvas exists and controls work once per input.
7. Resize the window and rotate a phone. Check the fixed 16:9 arena and unclipped controls.
8. On a landscape phone, hold movement while tapping jump, dash, and strike with another finger. Cancel a touch or background the browser; movement must stop.

Browser gameplay and physical mobile-device checks could not be completed in the delivery environment. See the implementation report for the exact verification boundary.
