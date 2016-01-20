var TONES = {
  "C3":	130.81,
  "C#3": 138.59,
  "D3":	146.83,
  "D#3":	155.56,
  "E3":	164.81,
  "F3":	174.61,
  "F#3":	185.00,
  "G3":	196.00,
  "G#3":	207.65,
  "A3":	220.00,
  "A#3":	233.08,
  "B3":	246.94,
  "C4":	261.63
};

for(var note in TONES) {
  TONES[note] = TONES[note] * 3;
}

module.exports = TONES;
