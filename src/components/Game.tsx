"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { bossSchema, DEFAULT_BOSS, type BossConfig } from "@/game/combat";
const Battle = dynamic(() => import("./Battle"), {
  ssr: false,
  loading: () => <p className="loading">Preparing the arena…</p>,
});
export default function Game() {
  const [screen, setScreen] = useState<"home" | "forge" | "battle">("home"),
    [config, setConfig] = useState<BossConfig>(DEFAULT_BOSS),
    [error, setError] = useState("");
  return (
    <>
      <header>
        <button
          className="brand"
          onClick={() => setScreen("home")}
          aria-label="Return home"
        >
          <span className="brand-mark">♜</span> FINAL BOSS
          <span className="brand-dot">.</span>
        </button>
        <span className="edition">
          THE FIRST TRIAL <span> / </span> v0.1
        </span>
        <button className="nav-button" onClick={() => setScreen("forge")}>
          Enter the forge ↗
        </button>
      </header>
      <main>
        {screen === "home" ? (
          <>
            <div className="hero-grid">
              <div className="hero-copy">
                <span className="eyebrow">
                  <i /> A DARK FANTASY BOSS BUILDER
                </span>
                <h1>
                  Every legend
                  <br />
                  needs a <em>villain.</em>
                  <br />
                  <span>Be the boss.</span>
                </h1>
                <p>
                  Forge a monster. Face what you’ve made.
                  <br />
                  Earn the right to call it unbeatable.
                </p>
                <div className="hero-actions">
                  <button
                    className="primary"
                    onClick={() => setScreen("forge")}
                  >
                    Create Boss <span>↗</span>
                  </button>
                  <button
                    className="secondary"
                    onClick={() => {
                      setConfig(DEFAULT_BOSS);
                      setScreen("battle");
                    }}
                  >
                    ▷ Play Demo
                  </button>
                </div>
                <div className="meta">
                  NO DOWNLOADS <span>◆</span> DESKTOP + MOBILE
                </div>
              </div>
              <div
                className="poster"
                aria-label="Original pixel illustration of the Ashen Warden"
              >
                <div className="poster-grid" />
                <div className="moon" />
                <div className="arch" />
                <div className="pixel-boss">
                  <div className="horn horn-l" />
                  <div className="horn horn-r" />
                  <div className="head">
                    <i />
                    <i />
                  </div>
                  <div className="shoulders" />
                  <div className="body">
                    <span>◆</span>
                  </div>
                  <div className="cape" />
                  <div className="leg leg-l" />
                  <div className="leg leg-r" />
                  <div className="sword" />
                </div>
                <div className="poster-floor" />
                <span className="poster-tag">I / THE FIRST CREATION</span>
                <div className="poster-caption">
                  <span className="eyebrow">KEEPER OF THE FORSAKEN GATE</span>
                  <h2>The Ashen Warden</h2>
                  <span className="boss-badge">
                    HEAVY BLADE <i /> RELENTLESS
                  </span>
                </div>
                <span className="corner tl" />
                <span className="corner br" />
              </div>
            </div>
            <section className="loop" aria-label="The game loop">
              <article>
                <span>01 / FORGE</span>
                <h3>Give fear a form.</h3>
                <p>
                  Tune your Warden’s strength, vitality, and attack wind-up.
                </p>
              </article>
              <article>
                <span>02 / PROVE</span>
                <h3>Survive your creation.</h3>
                <p>Read the blade. Find the opening. Win your own trial.</p>
              </article>
              <article>
                <span>03 / CHALLENGE</span>
                <h3>A legend worth sharing.</h3>
                <p>Shareable challenges are planned for a future release.</p>
              </article>
            </section>
          </>
        ) : screen === "forge" ? (
          <section className="forge">
            <span className="eyebrow">THE FORGE / LOCAL PROTOTYPE</span>
            <h1>
              Shape your <em>nemesis.</em>
            </h1>
            <p>One Warden. Your rules. Defeat it to verify your creation.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const result = bossSchema.safeParse(config);
                if (!result.success) {
                  setError(result.error.issues[0].message);
                  return;
                }
                setError("");
                setConfig(result.data);
                setScreen("battle");
              }}
            >
              <label>
                Boss name
                <input
                  value={config.name}
                  maxLength={24}
                  required
                  onChange={(e) =>
                    setConfig({ ...config, name: e.target.value })
                  }
                />
              </label>
              {(
                [
                  {
                    key: "hp",
                    title: "Vitality",
                    min: 60,
                    max: 300,
                    step: 20,
                    unit: "HP",
                  },
                  {
                    key: "damage",
                    title: "Heavy slash damage",
                    min: 10,
                    max: 40,
                    step: 5,
                    unit: "HP",
                  },
                  {
                    key: "telegraph",
                    title: "Attack wind-up",
                    min: 30,
                    max: 90,
                    step: 6,
                    unit: "ticks",
                  },
                ] as const
              ).map((f) => (
                <label key={f.key}>
                  {f.title}
                  <b>
                    {config[f.key]} {f.unit}
                  </b>
                  <input
                    type="range"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={config[f.key]}
                    onChange={(e) =>
                      setConfig({ ...config, [f.key]: Number(e.target.value) })
                    }
                  />
                </label>
              ))}
              <p className="muted">
                60 ticks = 1 second. Configuration lasts for this session.
              </p>
              {error && <p role="alert">{error}</p>}
              <div className="hero-actions">
                <button className="primary" type="submit">
                  Enter your trial ↗
                </button>
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setConfig({ ...DEFAULT_BOSS })}
                >
                  Reset defaults
                </button>
              </div>
            </form>
          </section>
        ) : (
          <Battle config={config} onLeave={() => setScreen("home")} />
        )}
      </main>
      <footer>
        <span>YOU ARE THE FINAL BOSS</span>
        <span>Forged in darkness. Proven in battle.</span>
        <span>FIRST PLAYABLE / 2026</span>
      </footer>
    </>
  );
}
