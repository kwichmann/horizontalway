var scales = [
  {
    family: 'Church modes',
    notes:  [0, 2, 4, 5, 7, 9, 11],
    modes:  ['Ionian (major)', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian (minor)', 'Locrian']
  },
  
  {
    family: 'Melodic minor family',
    notes:  [0, 2, 3, 5, 7, 9, 11],
    modes:  ['Melodic minor', 'Dorian b2', 'Lydian #5', 'Lydian dominant', 'Mixolydian b6 (Hindustani)', 'Locrian natural 2', 'Super locrian (altered)'],
  },
  
  {
    family: 'Harmonic minor family',
    notes:  [0, 2, 3, 5, 7, 8, 11],
    modes:  ['Harmonic minor', 'Locrian natural 6', 'Ionian #5', 'Dorian #4', 'Phrygian dominant', 'Lydian #2', 'Ultra locrian']
  },
  
  {
    family: 'Harmonic major family',
    notes:  [0, 2, 4, 5, 7, 8, 11],
    modes:  ['Harmonic major', 'Dorian b5', 'Phrygian b4', 'Lydian b3', 'Mixolydian b2', 'Lydian #2, #5', 'Locrian bb7']
  }
];

var notes = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'];

var intervals = ['2nd', '3rd', '4th', '5th', '6th', '7th'];

var pairs = [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [1, 3], [2, 4], [3, 5], [4, 6], [1, 4], [2, 5], [3, 6], [1, 5], [2, 6], [1, 6]];

var stringOffset = [0, 7, 2, 10, 5, 0, 7];

var noteHues = [0, 30, 60, 120, 180, 240, 300];