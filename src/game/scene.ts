import Phaser from "phaser";
import { B, type Battle, step } from "./combat";
import type { Controls } from "./input";
export class Arena extends Phaser.Scene {
  private ink!: Phaser.GameObjects.Graphics;
  private clock = 0;
  private lastNotify = 0;
  private notifiedEnd = false;
  constructor(
    private battle: Battle,
    private controls: Controls,
    private paused: () => boolean,
    private notify: (s: Battle) => void,
  ) {
    super("arena");
  }
  create() {
    this.ink = this.add.graphics();
    this.paint();
    this.notify(this.battle);
  }
  update(_time: number, delta: number) {
    if (this.paused()) {
      this.clock = 0;
      return;
    }
    this.clock += Math.min(delta, 100);
    while (this.clock >= B.step) {
      step(this.battle, this.controls.sample());
      this.clock -= B.step;
    }
    this.paint();
    if (
      this.battle.tick - this.lastNotify >= 6 ||
      (!this.notifiedEnd && this.battle.status !== "playing")
    ) {
      this.lastNotify = this.battle.tick;
      this.notifiedEnd = this.battle.status !== "playing";
      this.notify(this.battle);
    }
  }
  private paint() {
    const g = this.ink,
      s = this.battle,
      h = s.hero,
      b = s.boss;
    g.clear();
    const rect = (
      x: number,
      y: number,
      w: number,
      hh: number,
      c: number,
      a = 1,
    ) => {
      g.fillStyle(c, a);
      g.fillRect(Math.round(x), Math.round(y), w, hh);
    };
    rect(0, 0, 480, 270, 0x111217);
    rect(0, 80, 480, 142, 0x19191e);
    g.fillStyle(0x6e6060, 0.18);
    g.fillCircle(249, 63, 38);
    g.fillStyle(0x111217);
    g.fillCircle(265, 53, 34);
    for (let x = 28; x < 480; x += 75) {
      rect(x, 68, 28, 154, 0x242329);
      rect(x + 5, 75, 18, 139, 0x111318);
      rect(x - 5, 63, 38, 7, 0x302c30);
      rect(x - 4, 211, 36, 11, 0x393237);
      for (let y = 90; y < 205; y += 25) rect(x, y, 5, 2, 0x3c3337);
    }
    for (let x = 12; x < 480; x += 114) {
      rect(x, 133, 6, 30, 0x2c2425);
      rect(x - 2, 130, 10, 5, 0x9e643b);
      rect(x, 119, 6, 12, 0xd68b45);
      rect(x + 2, 116, 2, 11, 0xffd78d);
      g.fillStyle(0xb54424, 0.07);
      g.fillCircle(x + 3, 131, 26);
    }
    rect(0, 222, 480, 48, 0x252429);
    rect(0, 222, 480, 3, 0x6b5752);
    for (let x = 0; x < 480; x += 32) {
      rect(x, 238, 30, 1, 0x393239);
      rect(x + 14, 254, 30, 1, 0x393239);
      rect(x, 224, 1, 14, 0x17171c);
    }
    for (let j = 0; j < 18; j++) {
      const x = (j * 73 + 19) % 480,
        y = 30 + ((j * 31) % 180);
      rect(x, y, 1, 1, 0xc19b60, 0.5);
    }
    g.fillStyle(0x050608, 0.6);
    g.fillEllipse(h.x, 225, 26, 5);
    g.fillEllipse(b.x, 225, 53, 8);
    if (b.phase === "telegraph" || b.phase === "slash") {
      const start = b.face < 0 ? b.x - B.bossRange : b.x;
      rect(
        start,
        219,
        B.bossRange,
        3,
        b.phase === "slash" ? 0xffc084 : 0xab343d,
      );
      if (b.phase === "slash") rect(start, 190, B.bossRange, 29, 0xe48056, 0.3);
    }
    if (b.phase !== "death") {
      const c =
        b.phase === "damage"
          ? 0xe6d3a4
          : b.phase === "telegraph"
            ? 0x8b3c43
            : 0x57545e;
      rect(b.x - 19, 173, 38, 39, 0x562831);
      rect(b.x - 16, 171, 32, 32, c);
      rect(b.x - 21, 171, 42, 8, 0x81747a);
      rect(b.x - 13, 201, 10, 21, 0x393943);
      rect(b.x + 4, 201, 10, 21, 0x393943);
      rect(b.x - 11, 152, 22, 22, c);
      rect(b.x - 14, 148, 5, 12, 0xc2a36b);
      rect(b.x + 9, 148, 5, 12, 0xc2a36b);
      rect(b.x - 7, 161, 14, 3, 0xffa077);
      rect(b.x - 2, 177, 4, 21, 0xc3a46e);
      const sx = b.x + b.face * 27;
      rect(sx, 165, 5, 45, 0x9e8c79);
      rect(sx - 5, 199, 15, 4, 0xd7ad6e);
    } else {
      rect(b.x - 25, 213, 50, 9, 0x4a424c);
      rect(b.x - 5, 207, 11, 6, 0xc4a26a);
    }
    if (!h.inv || Math.floor(s.tick / 3) % 2 === 0) {
      rect(h.x - 8, h.y - 24, 16, 19, 0x8c343b);
      rect(h.x - 6, h.y - 27, 12, 17, 0xb8b7b8);
      rect(h.x - 7, h.y - 35, 14, 12, 0xddd4bd);
      rect(h.x + (h.face > 0 ? 1 : -6), h.y - 31, 5, 3, 0x24232c);
      rect(h.x - 6, h.y - 8, 5, 8, 0x646472);
      rect(h.x + 2, h.y - 8, 5, 8, 0x646472);
      rect(h.x + h.face * 10, h.y - 22, 3, 19, 0xd0c8b8);
    }
    if (h.attack) {
      rect(h.face > 0 ? h.x + 10 : h.x - 40, h.y - 24, 30, 3, 0xffe3a1);
      rect(h.face > 0 ? h.x + 36 : h.x - 41, h.y - 22, 3, 9, 0xf5ba78);
    }
  }
}
