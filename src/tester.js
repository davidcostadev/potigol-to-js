const expect = require('expect');

console.clear()

const compiler = require('./compiler');

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