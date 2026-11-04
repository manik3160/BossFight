import { z } from "zod";
export const bossSchema = z.object({
  name: z.string().trim().min(1).max(24),
  hp: z.number().int().min(60).max(300),
  damage: z.number().int().min(10).max(40),
  telegraph: z.number().int().min(30).max(90),
});
export type BossConfig = z.infer<typeof bossSchema>;
export const DEFAULT_BOSS: BossConfig = {
  name: "The Ashen Warden",
  hp: 160,
  damage: 25,
  telegraph: 54,
};
export const B = {
  width: 480,
  height: 270,
  floor: 222,
  step: 1000 / 60,
  heroHP: 100,
  speed: 2,
  gravity: 0.22,
  jump: -5,
  attackDamage: 20,
  attackCooldown: 27,
  attackFrames: 10,
  attackRange: 45,
  dashSpeed: 5,
  dashFrames: 12,
  dashCooldown: 55,
  iframes: 45,
  bossIdle: 65,
  bossSlash: 15,
  bossRecovery: 70,
  bossDamage: 9,
  bossRange: 85,
  bossSpeed: 0.55,
} as const;
export type Input = {
  left: boolean;
  right: boolean;
  jump: boolean;
  attack: boolean;
  dash: boolean;
};
export const noInput = (): Input => ({
  left: false,
  right: false,
  jump: false,
  attack: false,
  dash: false,
});
export type BossPhase =
  "idle" | "telegraph" | "slash" | "recovery" | "damage" | "death";
export type Battle = {
  tick: number;
  status: "playing" | "victory" | "defeat";
  hero: {
    x: number;
    y: number;
    vy: number;
    face: number;
    hp: number;
    inv: number;
    attack: number;
    attackCD: number;
    dash: number;
    dashCD: number;
    hit: boolean;
  };
  boss: {
    x: number;
    face: number;
    hp: number;
    phase: BossPhase;
    time: number;
    hit: boolean;
  };
  config: BossConfig;
};
export function createBattle(config: BossConfig = DEFAULT_BOSS): Battle {
  const valid = bossSchema.parse(config);
  return {
    tick: 0,
    status: "playing",
    config: valid,
    hero: {
      x: 110,
      y: B.floor,
      vy: 0,
      face: 1,
      hp: B.heroHP,
      inv: 0,
      attack: 0,
      attackCD: 0,
      dash: 0,
      dashCD: 0,
      hit: false,
    },
    boss: {
      x: 345,
      face: -1,
      hp: valid.hp,
      phase: "idle",
      time: B.bossIdle,
      hit: false,
    },
  };
}
export function damageHero(s: Battle, amount: number): boolean {
  if (s.hero.inv > 0 || s.status !== "playing") return false;
  s.hero.hp = Math.max(0, s.hero.hp - Math.max(0, amount));
  s.hero.inv = B.iframes;
  if (!s.hero.hp) s.status = "defeat";
  return true;
}
function phase(s: Battle, p: BossPhase, time: number) {
  s.boss.phase = p;
  s.boss.time = time;
}
/** One deterministic 60 Hz tick. Mutates owned state; no clock, DOM or randomness. */
export function step(s: Battle, i: Input): void {
  if (s.status !== "playing") return;
  s.tick++;
  const h = s.hero,
    b = s.boss;
  for (const k of ["inv", "attack", "attackCD", "dash", "dashCD"] as const)
    h[k] = Math.max(0, h[k] - 1);
  const move = Number(i.right) - Number(i.left);
  if (move && !h.dash) h.face = move;
  if (i.jump && h.y === B.floor) {
    h.vy = B.jump;
  }
  if (i.dash && !h.dashCD) {
    h.dash = B.dashFrames;
    h.dashCD = B.dashCooldown;
    h.inv = Math.max(h.inv, B.dashFrames);
  }
  h.x = Math.max(
    12,
    Math.min(468, h.x + (h.dash ? h.face * B.dashSpeed : move * B.speed)),
  );
  h.vy += B.gravity;
  h.y = Math.min(B.floor, h.y + h.vy);
  if (h.y === B.floor) h.vy = 0;
  if (i.attack && !h.attackCD) {
    h.attack = B.attackFrames;
    h.attackCD = B.attackCooldown;
    h.hit = false;
  }
  if (
    h.attack &&
    !h.hit &&
    Math.abs(h.x - b.x) < B.attackRange &&
    (b.x - h.x) * h.face >= -8 &&
    h.y > B.floor - 45
  ) {
    h.hit = true;
    b.hp = Math.max(0, b.hp - B.attackDamage);
    if (!b.hp) {
      phase(s, "death", 0);
      s.status = "victory";
      return;
    }
    // Only recovery can be staggered: the committed heavy attack cannot be stun-locked.
    if (b.phase === "recovery") phase(s, "damage", B.bossDamage);
  }
  b.time--;
  if (b.phase === "idle") {
    b.face = h.x < b.x ? -1 : 1;
    if (Math.abs(h.x - b.x) > 65) b.x += b.face * B.bossSpeed;
    if (b.time <= 0) phase(s, "telegraph", s.config.telegraph);
  } else if (b.phase === "telegraph" && b.time <= 0) {
    phase(s, "slash", B.bossSlash);
    b.hit = false;
  } else if (b.phase === "slash") {
    const dx = h.x - b.x;
    if (
      !b.hit &&
      Math.abs(dx) < B.bossRange &&
      dx * b.face >= -12 &&
      h.y > B.floor - 34
    ) {
      if (damageHero(s, s.config.damage)) b.hit = true;
    }
    if (b.time <= 0) phase(s, "recovery", B.bossRecovery);
  } else if (b.phase === "recovery" && b.time <= 0)
    phase(s, "idle", B.bossIdle);
  else if (b.phase === "damage" && b.time <= 0) phase(s, "recovery", 30);
}
