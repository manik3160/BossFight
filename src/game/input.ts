import { noInput, type Input } from "./combat";
export type Action = keyof Input;
const keys: Record<string, Action> = {
  KeyA: "left",
  ArrowLeft: "left",
  KeyD: "right",
  ArrowRight: "right",
  Space: "jump",
  KeyW: "jump",
  ArrowUp: "jump",
  KeyJ: "attack",
  KeyX: "attack",
  ShiftLeft: "dash",
  ShiftRight: "dash",
  KeyK: "dash",
};
export class Controls {
  private held = new Map<string, Action>();
  private taps = new Set<Action>();
  constructor(
    private target: HTMLElement,
    private pause: () => void,
  ) {
    target.addEventListener("keydown", this.down);
    target.addEventListener("keyup", this.up);
  }
  private down = (e: KeyboardEvent) => {
    if (e.code === "Escape" || e.code === "KeyP") {
      e.preventDefault();
      if (!e.repeat) this.pause();
      return;
    }
    const a = keys[e.code];
    if (a) {
      e.preventDefault();
      if (!e.repeat) this.press(e.code, a);
    }
  };
  private up = (e: KeyboardEvent) => {
    if (keys[e.code]) {
      e.preventDefault();
      this.release(e.code);
    }
  };
  press(id: string, a: Action) {
    this.held.set(id, a);
    this.taps.add(a);
  }
  release(id: string) {
    this.held.delete(id);
  }
  sample(): Input {
    const i = noInput();
    for (const a of this.held.values())
      if (a === "left" || a === "right") i[a] = true;
    for (const a of this.taps) i[a] = true;
    this.taps.clear();
    return i;
  }
  clear() {
    this.held.clear();
    this.taps.clear();
  }
  destroy() {
    this.clear();
    this.target.removeEventListener("keydown", this.down);
    this.target.removeEventListener("keyup", this.up);
  }
}
