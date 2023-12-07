let context: AudioContext;
if (window.AudioContext) {
  context = new AudioContext();
} else if (window.webkitAudioContext) {
  context = new webkitAudioContext();
} else {
  context = {};
}

export function note(frequency: number | number[], meta?, callback?) {
  if (!meta) meta = {};
  const undef = void 0;
  if (meta.type == undef) meta.type = "sine";
  if (meta.volume == undef) meta.volume = 0.03125;
  if (meta.sustain == undef) meta.sustain = 0;
  if (meta.chord == undef) meta.chord = false;
  if (meta.reverb == undef) meta.reverb = 0.25;
  // console.log(JSON.stringify(meta, null, '\t'));
  if (typeof frequency !== "number") {
    let x = frequency.length;
    while (x--) {
      if (x) note(frequency[x], meta);
      else return note(frequency[x], meta, callback);
    }
  }
  const o = context.createOscillator();
  const g = context.createGain();
  o.type = meta.type;
  o.connect(g);
  g.gain.value = meta.volume;
  o.frequency.value = frequency;
  g.connect(context.destination);
  o.start(0);
  if (!meta.chord) {
    g.gain.setTargetAtTime(0, context.currentTime + meta.sustain, meta.reverb);
  } else
    meta.chord.push(
      (function (g, context, meta) {
        return function () {
          g.gain.setTargetAtTime(0, context.currentTime + meta.sustain, meta.reverb);
        };
      })(g, context, meta)
    );
  if (callback) {
    if (meta.chord) {
      let x = meta.chord.length;
      while (x--) meta.chord[x]();
    }
    callback();
  }
}
