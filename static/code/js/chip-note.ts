import { note } from "./note";

export function chipNote() {
  return note(9250, {
    reverb: 0,
    sustain: 1 / 32,
    volume: 1 / 256,
    type: "sawtooth",
  });
}
