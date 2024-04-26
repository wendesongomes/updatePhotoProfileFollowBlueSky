type LetterMatrix = string[];

interface Letters {
  [key: string]: LetterMatrix;
}

const letters: Letters = {
  'A': [
    '    A    ',
    '   AAA   ',
    '  AA AA  ',
    ' AA   AA ',
    'AAAAAAAAA',
    'AA     AA'
  ],
  'V': [
    'V       V',
    'V       V',
    'V       V',
    ' V     V ',
    '  V   V  ',
    '   VVV   '
  ],
  'L': [
    'LL       ',
    'LL       ',
    'LL       ',
    'LL       ',
    'LL       ',
    'LLLLLLLLL'
  ],
  'O': [
    '  OOOO   ',
    'OO    OO ',
    'OO    OO ',
    'OO    OO ',
    'OO    OO ',
    '  OOOO   '
  ],
  'D': [
    'DDDDD    ',
    'DD   DD  ',
    'DD    DD ',
    'DD    DD ',
    'DD   DD  ',
    'DDDDD    '
  ],
  'I': [
    'IIIIIIII',
    '   II   ',
    '   II   ',
    '   II   ',
    '   II   ',
    'IIIIIIII'
  ],
  'N': [
    'NN    NN',
    'NNN   NN',
    'NN N  NN',
    'NN  N NN',
    'NN   NNN',
    'NN    NN'
  ],
  'G': [
    '  GGGGGG ',
    'GG      G',
    'GG       ',
    'GG   GGG ',
    'GG    GG ',
    '  GGGGGG '
  ],
};

export function printBigText(text: string): void {
  const lines: string[] = Array(6).fill('');
  const bar = '/' + '/'.repeat(text.length * 12) + '/ \n';
  console.log('\n')
  console.log(bar);

  for (const char of text.toUpperCase()) {
    const letter = letters[char];
    if (letter) {
      letter.forEach((line, index) => lines[index] += line + '  ');
    }
  }
  lines.forEach(line => console.log('/      ' + line + '     /'));
  console.log('\n')
  console.log(bar);
}