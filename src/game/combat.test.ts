import { describe, it, expect } from "vitest";
import {
  B,
  createBattle,
  damageHero,
  noInput,
  step,
  bossSchema,
} from "./combat";
function ticks(s: ReturnType<typeof createBattle>, n: number) {
  for (let i = 0; i < n; i++) step(s, noInput());
}
describe("combat", () => {
  it("validates untrusted boss configuration", () => {
    expect(
      bossSchema.safeParse({ name: "", hp: 0, damage: 999, telegraph: 1 })
        .success,
    ).toBe(false);
  });
  it("applies damage and blocks repeated hits during i-frames", () => {
    const s = createBattle();
    expect(damageHero(s, 25)).toBe(true);
    expect(s.hero.hp).toBe(75);
    expect(damageHero(s, 25)).toBe(false);
    ticks(s, B.iframes);
    expect(damageHero(s, 25)).toBe(true);
  });
  it("clamps health and defeat freezes simulation", () => {
    const s = createBattle();
    damageHero(s, 200);
    expect(s.hero.hp).toBe(0);
    expect(s.status).toBe("defeat");
    step(s, { ...noInput(), right: true });
    expect(s.tick).toBe(0);
  });
  it("sword damages once per swing and respects cooldown", () => {
    const s = createBattle();
    s.hero.x = 320;
    step(s, { ...noInput(), attack: true });
    expect(s.boss.hp).toBe(140);
    step(s, { ...noInput(), attack: true });
    expect(s.boss.hp).toBe(140);
    ticks(s, B.attackCooldown);
    step(s, { ...noInput(), attack: true });
    expect(s.boss.hp).toBe(120);
  });
  it("requires facing and range for sword damage", () => {
    const s = createBattle();
    step(s, { ...noInput(), attack: true });
    expect(s.boss.hp).toBe(160);
    s.hero.x = 320;
    s.hero.face = -1;
    s.hero.attackCD = 0;
    step(s, { ...noInput(), attack: true });
    expect(s.boss.hp).toBe(160);
  });
  it("cycles idle → telegraph → slash → recovery → idle", () => {
    const s = createBattle();
    ticks(s, B.bossIdle);
    expect(s.boss.phase).toBe("telegraph");
    ticks(s, s.config.telegraph);
    expect(s.boss.phase).toBe("slash");
    ticks(s, B.bossSlash);
    expect(s.boss.phase).toBe("recovery");
    ticks(s, B.bossRecovery);
    expect(s.boss.phase).toBe("idle");
  });
  it("allows recovery stagger but not telegraph stun lock", () => {
    const s = createBattle();
    s.hero.x = 320;
    s.boss.phase = "telegraph";
    s.boss.time = 40;
    step(s, { ...noInput(), attack: true });
    expect(s.boss.phase).toBe("telegraph");
    s.hero.attackCD = 0;
    s.boss.phase = "recovery";
    step(s, { ...noInput(), attack: true });
    expect(s.boss.phase).toBe("damage");
    ticks(s, B.bossDamage);
    expect(s.boss.phase).toBe("recovery");
  });
  it("dash grants invulnerability and cannot repeat before cooldown", () => {
    const s = createBattle();
    step(s, { ...noInput(), dash: true });
    expect(s.hero.inv).toBe(B.dashFrames);
    expect(damageHero(s, 10)).toBe(false);
    ticks(s, B.dashFrames);
    step(s, { ...noInput(), dash: true });
    expect(s.hero.dash).toBe(0);
    ticks(s, B.dashCooldown);
    step(s, { ...noInput(), dash: true });
    expect(s.hero.dash).toBe(B.dashFrames);
  });
  it("heavy slash hits only once and jumping clears its hitbox", () => {
    const s = createBattle();
    s.hero.x = 300;
    s.boss.phase = "slash";
    s.boss.time = 15;
    step(s, noInput());
    expect(s.hero.hp).toBe(75);
    s.hero.inv = 0;
    step(s, noInput());
    expect(s.hero.hp).toBe(75);
    const airborne = createBattle();
    airborne.hero.x = 300;
    airborne.hero.y = 180;
    airborne.boss.phase = "slash";
    step(airborne, noInput());
    expect(airborne.hero.hp).toBe(100);
  });
  it("victory marks death, clamps boss HP and freezes the timer", () => {
    const s = createBattle();
    s.hero.x = 320;
    s.boss.hp = 10;
    step(s, { ...noInput(), attack: true });
    expect(s.boss.hp).toBe(0);
    expect(s.boss.phase).toBe("death");
    expect(s.status).toBe("victory");
    ticks(s, 100);
    expect(s.tick).toBe(1);
  });
  it("jump lands and arena edges clamp movement", () => {
    const s = createBattle();
    step(s, { ...noInput(), jump: true });
    expect(s.hero.y).toBeLessThan(B.floor);
    ticks(s, 60);
    expect(s.hero.y).toBe(B.floor);
    s.hero.x = 467;
    step(s, { ...noInput(), right: true });
    expect(s.hero.x).toBe(468);
  });
  it("replays identical input deterministically", () => {
    const a = createBattle(),
      b = createBattle();
    for (let n = 0; n < 600; n++) {
      const i = {
        ...noInput(),
        right: n < 80,
        attack: n % 30 === 0,
        dash: n % 70 === 0,
        jump: n % 120 === 0,
      };
      step(a, i);
      step(b, i);
    }
    expect(a).toEqual(b);
  });
  it("a new battle resets all combat state", () => {
    const old = createBattle();
    damageHero(old, 100);
    const fresh = createBattle();
    expect(fresh.status).toBe("playing");
    expect(fresh.hero.hp).toBe(100);
    expect(fresh.tick).toBe(0);
  });
});

it("completes a default fight from spawn to victory using legal inputs", () => {
  const s = createBattle();
  for (let t = 0; t < 1800 && s.status === "playing"; t++) {
    step(s, {
      ...noInput(),
      right: s.boss.x - s.hero.x > 30,
      attack: t % 28 === 0,
    });
  }
  expect(s.status).toBe("victory");
  expect(s.hero.hp).toBeGreaterThan(0);
});
it("an undefended default fight reaches defeat from spawn", () => {
  const s = createBattle();
  for (let t = 0; t < 3600 && s.status === "playing"; t++) step(s, noInput());
  expect(s.status).toBe("defeat");
  expect(s.hero.hp).toBe(0);
});
