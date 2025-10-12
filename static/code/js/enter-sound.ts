import { play } from "./play";

export function enterSound() {
  play(
    [
      950,
      [950, 1250],
      // 1250,
      [1250, 1900],
      // 2000,
      [1600, 1900],
      // 1550
    ],
    100,
    {
      reverb: 0.25,
      type: "sine",
      // sustain: .25
    }
  );
}
