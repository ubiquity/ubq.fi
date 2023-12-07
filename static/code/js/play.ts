import { note } from "./note";
export function play(notes, speed, meta) {
  return note(notes.shift(), meta, () => {
    if (notes.length)
      setTimeout(() => {
        play(notes, speed, meta);
      }, speed);
  });
}
