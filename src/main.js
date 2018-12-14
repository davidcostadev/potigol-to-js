const expect = require('expect');

console.clear();

const compressLine = (line) => {
  const a = line.replace(/var /g, '').replace(/[ ]/g, '');
  return a
}

const assigmentCore = ([ name, value ]) => `${name} = ${value}`

const assigmentConstant = (data) => `const ${assigmentCore(data)}`;

const assigmentSimple = (data) => `let ${assigmentCore(data)}`;


const checkAssigment = (string) => {
  if (string.match(/[:][=]/g)) {
    return ':=';
  }
  if (string.match(/[=]/g)) {
    return '=';
  }
  
  return '';
}

const checkTypeAssigment = (string) => {
  if (string.match(/var /)) {
    return assigmentSimple;
  }
   if (string.match(/:=/)) {
     return assigmentCore;
   }
   return assigmentConstant;
}

const assigment = string => {
  const assignFunction = checkTypeAssigment(string);
  const [names, values] = compressLine(string).split(checkAssigment(string));

  const namesList = names.split(',');
  const valuesList = values.split(',');
  

  return namesList.map((name, index) => {
    if (valuesList.length === 1) {
      return assignFunction([name, valuesList[0]])
    }
    
    return assignFunction([name, valuesList[index]])
  }).join(';') + ';'
}

const splitLines = string => {
  const lines = string.split('\n').filter(line => line.length);

  return lines
}

const compiler = (string) => {
  const pipe = splitLines(string).map(assigment).join('\n');
  return pipe;
}

expect(compiler('algo = 1')).toBe('const algo = 1;');
expect(compiler('algo = \'string\'')).toBe('const algo = \'string\';');
expect(compiler('x, y = 20')).toBe('const x = 20;const y = 20;');
expect(compiler('x, y = 1, 2')).toBe('const x = 1;const y = 2;');
expect(compiler('var y := 10 ')).toBe('let y = 10;');
expect(compiler('a, b, c := b, a, 4')).toBe('a = b;b = a;c = 4;');

const twoLines = `
y = 1
var x := y
`

expect(compiler(twoLines)).toBe('const y = 1;\nlet x = y;');

console.log('all tests are passed')