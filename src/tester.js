const expect = require('expect');
console.log('\n\nNEW TEST\n\n')

const compiler = require('./compiler');

console.log('- assigment');

expect(compiler('algo = 1')).toBe('const algo = 1;');
expect(compiler('algo = "string"')).toBe('const algo = \'string\';');
expect(compiler('algo = "two word"')).toBe('const algo = \'two word\';');
expect(compiler('algo = \'string\'')).toBe('const algo = \'string\';');
expect(compiler('x = 2\ny = "number: {x}"')).toBe(`const x = 2;
const y = \`number: \${x}\`;`);
expect(compiler('x, y = 20')).toBe('const x = 20;const y = 20;');
expect(compiler('x, y = 1, 2')).toBe('const x = 1;const y = 2;');
expect(compiler('var y := 10 ')).toBe('let y = 10;');
expect(compiler('a, b, c := b, a, 4')).toBe('a = b;b = a;c = 4;');

const twoLines = `
y = 1
var x := y
`

expect(compiler(twoLines)).toBe('const y = 1;\nlet x = y;');

console.log('- output');

expect(compiler('escreva "algo"')).toBe('console.log(\'algo\');');
expect(compiler('escreva variavel')).toBe('console.log(variavel);');
expect(compiler('escreva 1')).toBe('console.log(1);');
expect(compiler('imprima "algo"')).toBe('console.log(\'algo\', \'\n\');');
expect(compiler('name = "david"\nescreva "Olá {name}"')).toBe('const name = \'david\';\nconsole.log(`Olá ${name}`);');



console.log('all tests are passed')
