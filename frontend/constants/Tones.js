var TONES = {
  "equal": {
    "C3":	130.81,
    "CS3": 138.59,
    "D3":	146.83,
    "DS3":	155.56,
    "E3":	164.81,
    "F3":	174.61,
    "FS3":	185.00,
    "G3":	196.00,
    "GS3":	207.65,
    "A3":	220.00,
    "AS3":	233.08,
    "B3":	246.94,
    "C4":	261.63
  },

  "pythagorean": {
    "C3":	130,
    "CS3": 130 ,
    "D3":	130 * 9/8,
    "DS3":	130 * 9/8,
    "E3":	130 * 81/64,
    "F3":	130 * 4/3,
    "FS3":	130 * 4/3,
    "G3":	130 * 3/2,
    "GS3":	130 * 3/2,
    "A3":	130 * 27/16,
    "AS3":	130 * 27/16,
    "B3":	130 * 243/128,
    "C4":	130 * 2
  },

  "correct": {
    "C3":	130,
    "CS3": 130 * 256/243,
    "D3":	130 * 64/81 * Math.sqrt(2),
    "DS3":	130 * 32/27,
    "E3":	130 * 256/243 * Math.pow(2, 0.25),
    "F3":	130 * 4/3,
    "FS3":	130 * 1024/729,
    "G3":	130 * 8/9 * Math.pow(8, 0.25),
    "GS3":	130 * 128 / 81,
    "A3":	130 * 1024 / 729 * Math.pow(2, 0.25),
    "AS3":	130 * 16/9,
    "B3":	130 * 128 / 81 * Math.pow(2, 0.25),
    "C4":	130 * 2
  },

  "well": {
    "C3":	130,
    "CS3": 130 * 567/512,
    "D3":	130 * 9/8,
    "DS3":	130 * 147/128,
    "E3":	130 * 21/16,
    "F3":	130 * 1323/1024,
    "FS3":	130 * 189/128,
    "G3":	130 * 3/2,
    "GS3":	130 * 49/32,
    "A3":	130 * 7/4,
    "AS3":	130 * 441/256,
    "B3":	130 * 63/32,
    "C4":	130 * 2
  },

  "limit": {
    "C3":	130,
    "CS3": 130 * 16/15,
    "D3":	130 * 9/8,
    "DS3":	130 * 6/5,
    "E3":	130 * 5/4,
    "F3":	130 * 4/3,
    "FS3":	130 * 45/32,
    "G3":	130 * 3/2,
    "GS3":	130 * 8/5,
    "A3":	130 * 5/3,
    "AS3":	130 * 9/5,
    "B3":	130 * 15/8,
    "C4":	130 * 2
  }
};

// for(var tuning in TONES) {
//   if (TONES.hasOwnProperty(tuning)){
//
//     for (var note in tuning){
//       TONES[tuning][note] = TONES[tuning][note] * 3;
//     }
//   }
// }

module.exports = TONES;
