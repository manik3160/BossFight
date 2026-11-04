import { it, expect } from "vitest";
import { Controls } from "./input";
it("retains held movement, consumes action taps, and clears on focus loss", () => {
  const target = new EventTarget() as HTMLElement;
  const input = new Controls(target, () => {});
  input.press("finger1", "left");
  input.press("finger2", "attack");
  expect(input.sample()).toMatchObject({ left: true, attack: true });
  expect(input.sample()).toMatchObject({ left: true, attack: false });
  input.release("finger1");
  expect(input.sample().left).toBe(false);
  input.press("finger3", "dash");
  input.clear();
  expect(input.sample().dash).toBe(false);
  input.destroy();
});
it("releasing one source does not cancel another held source", () => {
  const input = new Controls(new EventTarget() as HTMLElement, () => {});
  input.press("keyboard", "right");
  input.press("touch", "right");
  input.sample();
  input.release("touch");
  expect(input.sample().right).toBe(true);
  input.destroy();
  expect(input.sample().right).toBe(false);
});
