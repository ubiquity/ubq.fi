let context: AudioContext;
if (window.AudioContext) {
  context = new AudioContext();
} else if (window.webkitAudioContext) {
  context = new webkitAudioContext();
} else {
  context = {};
}

export function note(frequency: number | number[], meta?, callback?) {
  meta = setDefaultMeta(meta);
  if (typeof frequency !== "number") {
    handleFrequencyArray(frequency, meta, callback);
  } else {
    handleFrequencyNumber(frequency, meta, callback);
  }
}

function setDefaultMeta(meta) {
  if (!meta) meta = {};
  const undef = void 0;
  if (meta.type == undef) meta.type = "sine";
  if (meta.volume == undef) meta.volume = 0.03125;
  if (meta.sustain == undef) meta.sustain = 0;
  if (meta.chord == undef) meta.chord = false;
  if (meta.reverb == undef) meta.reverb = 0.25;
  return meta;
}

function handleFrequencyArray(frequency: number[], meta, callback) {
  let x = frequency.length;
  while (x--) {
    if (x) note(frequency[x], meta);
    else return note(frequency[x], meta, callback);
  }
}

function handleFrequencyNumber(frequency: number, meta, callback) {
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
  } else {
    handleChord(meta, g, context);
  }
  if (callback) {
    handleCallback(meta, callback);
  }
}

function handleChord(meta, g, context) {
  meta.chord.push(
    (function (g, context, meta) {
      return function () {
        g.gain.setTargetAtTime(0, context.currentTime + meta.sustain, meta.reverb);
      };
    })(g, context, meta)
  );
}

function handleCallback(meta, callback) {
  if (meta.chord) {
    let x = meta.chord.length;
    while (x--) meta.chord[x]();
  }
  callback();
}
