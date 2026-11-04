"use client";
import { useEffect, useRef, useState } from "react";
import {
  B,
  createBattle,
  type Battle as BattleState,
  type BossConfig,
} from "@/game/combat";
import { Controls, type Action } from "@/game/input";
export default function Battle({
  config,
  onLeave,
}: {
  config: BossConfig;
  onLeave: () => void;
}) {
  const host = useRef<HTMLDivElement>(null),
    surface = useRef<HTMLElement>(null),
    controls = useRef<Controls | null>(null),
    paused = useRef(false);
  const [isPaused, setPaused] = useState(false),
    [round, setRound] = useState(0),
    [hud, setHud] = useState({
      hero: B.heroHP as number,
      boss: config.hp,
      tick: 0,
      status: "playing",
      phase: "idle",
      dash: 0,
    }),
    [error, setError] = useState(""),
    [ready, setReady] = useState(false);
  const toggle = () => {
    paused.current = !paused.current;
    setPaused(paused.current);
    controls.current?.clear();
    surface.current?.focus();
  };
  useEffect(() => {
    let cancelled = false;
    let game: import("phaser").Game | undefined;
    let resize: ResizeObserver | undefined;
    const state = createBattle(config);
    const el = surface.current!;
    const input = new Controls(el, () => {
      paused.current = !paused.current;
      setPaused(paused.current);
      input.clear();
    });
    controls.current = input;
    const blur = () => {
      paused.current = true;
      setPaused(true);
      input.clear();
    };
    const visibility = () => {
      if (document.hidden) blur();
    };
    window.addEventListener("blur", blur);
    document.addEventListener("visibilitychange", visibility);
    Promise.all([import("phaser"), import("@/game/scene")])
      .then(([{ default: Phaser }, { Arena }]) => {
        if (cancelled) return;
        const notify = (s: BattleState) =>
          setHud((prev) => {
            const next = {
              hero: s.hero.hp,
              boss: s.boss.hp,
              tick: s.tick,
              status: s.status,
              phase: s.boss.phase,
              dash: s.hero.dashCD,
            };
            return Object.keys(next).every(
              (k) =>
                prev[k as keyof typeof prev] === next[k as keyof typeof next],
            )
              ? prev
              : next;
          });
        game = new Phaser.Game({
          type: Phaser.AUTO,
          parent: host.current!,
          width: 480,
          height: 270,
          backgroundColor: "#111217",
          pixelArt: true,
          roundPixels: true,
          scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
          },
          scene: new Arena(state, input, () => paused.current, notify),
          audio: { noAudio: true },
        });
        resize = new ResizeObserver(() => game?.scale.refresh());
        resize.observe(host.current!);
        game.canvas.setAttribute(
          "aria-label",
          "Side-view arena. Use the controls below to fight the Warden.",
        );
        setReady(true);
        el.focus();
      })
      .catch(() => {
        if (!cancelled)
          setError("The arena could not load. Please reload the page.");
      });
    return () => {
      cancelled = true;
      input.destroy();
      controls.current = null;
      window.removeEventListener("blur", blur);
      document.removeEventListener("visibilitychange", visibility);
      resize?.disconnect();
      game?.destroy(true);
    };
  }, [config, round]);
  const restart = () => {
    paused.current = false;
    setPaused(false);
    setReady(false);
    setRound((x) => x + 1);
  };
  const touch = (action: Action, label: string) => (
    <button
      className={"touch " + action}
      aria-label={label}
      onPointerDown={(e) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
        surface.current?.focus();
        controls.current?.press("touch" + e.pointerId, action);
      }}
      onPointerUp={(e) => controls.current?.release("touch" + e.pointerId)}
      onPointerCancel={(e) => controls.current?.release("touch" + e.pointerId)}
      onLostPointerCapture={(e) =>
        controls.current?.release("touch" + e.pointerId)
      }
    >
      {label}
    </button>
  );
  return (
    <section
      className="battle"
      ref={surface}
      tabIndex={0}
      aria-label="Battle controls"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          controls.current?.clear();
          paused.current = true;
          setPaused(true);
        }
      }}
    >
      <div className="battle-heading">
        <div>
          <span className="eyebrow">TRIAL 001 · THE FORSAKEN KEEP</span>
          <h2>{config.name}</h2>
        </div>
        <button onClick={onLeave} className="quiet">
          Leave arena ↗
        </button>
      </div>
      <div className="hud">
        <div>
          <span>
            THE CHALLENGER{" "}
            <b>
              {hud.hero} / {B.heroHP}
            </b>
          </span>
          <meter
            min="0"
            max={B.heroHP}
            value={hud.hero}
            aria-label="Hero health"
          />
        </div>
        <time>
          {Math.floor(hud.tick / 3600)
            .toString()
            .padStart(2, "0")}
          :
          {Math.floor((hud.tick / 60) % 60)
            .toString()
            .padStart(2, "0")}
        </time>
        <div>
          <span>
            THE WARDEN{" "}
            <b>
              {hud.boss} / {config.hp}
            </b>
          </span>
          <meter
            min="0"
            max={config.hp}
            value={hud.boss}
            aria-label="Boss health"
          />
        </div>
      </div>
      <div className="arena-wrap">
        <div ref={host} className="canvas-host" />
        {!ready && !error && <div className="overlay">Opening the gates…</div>}
        {error && (
          <div className="overlay" role="alert">
            {error}
          </div>
        )}
        {(isPaused || hud.status !== "playing") && ready && (
          <div className="overlay">
            <span className="eyebrow">
              {hud.status === "victory"
                ? "THE TRIAL IS COMPLETE"
                : "THE KEEP AWAITS"}
            </span>
            <h2>
              {hud.status === "victory"
                ? "Warden vanquished"
                : hud.status === "defeat"
                  ? "You have fallen"
                  : "Battle paused"}
            </h2>
            <p>
              {hud.status === "victory"
                ? "You defeated your creation."
                : hud.status === "defeat"
                  ? "Read the wind-up. Dash through the blade."
                  : "Take a breath. Your trial will wait."}
            </p>
            <button
              className="primary"
              onClick={hud.status === "playing" ? toggle : restart}
            >
              {hud.status === "playing" ? "Resume battle" : "Try again ↗"}
            </button>
          </div>
        )}
      </div>
      <div className="battle-tools">
        <span aria-live="polite">
          {hud.status === "playing"
            ? hud.phase === "telegraph"
              ? "⚠ Heavy slash incoming"
              : hud.phase === "recovery" || hud.phase === "damage"
                ? "Opening! Strike now."
                : "Watch the Warden’s blade."
            : hud.status === "victory"
              ? "Victory — challenge verified locally."
              : "Defeat — another attempt awaits."}
        </span>
        <div>
          <button onClick={toggle} disabled={hud.status !== "playing"}>
            {isPaused ? "Resume" : "Pause"}
          </button>
          <button onClick={restart}>Restart</button>
        </div>
      </div>
      <div className="touch-controls">
        <div>
          {touch("left", "←")}
          {touch("right", "→")}
        </div>
        <div>
          {touch("jump", "Jump")}
          {touch("dash", hud.dash ? "Dash · wait" : "Dash")}
          {touch("attack", "Strike")}
        </div>
      </div>
      <p className="control-help">
        <kbd>A</kbd>
        <kbd>D</kbd> move <kbd>Space</kbd> jump <kbd>J</kbd> strike{" "}
        <kbd>Shift</kbd> dash <kbd>Esc</kbd> pause{" "}
        <span>· Landscape recommended on mobile</span>
      </p>
    </section>
  );
}
