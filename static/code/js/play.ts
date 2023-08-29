import { note } from './note';
export function play(notes, speed, meta) {
  return note(notes.shift(), meta, function () {
    if (notes.length)
      setTimeout(function () {
        play(notes, speed, meta);
      }, speed);
  });
}
