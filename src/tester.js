const expect = require('expect');

console.log('\n\nNEW TEST\n\n');

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
`;

expect(compiler(twoLines)).toBe('const y = 1;\nlet x = y;');

console.log('- output');

expect(compiler('escreva "algo"')).toBe('console.log(\'algo\');');
expect(compiler('escreva variavel')).toBe('console.log(variavel);');
expect(compiler('escreva 1')).toBe('console.log(1);');
expect(compiler('imprima "algo"')).toBe('console.log(\'algo\', \'\n\');');
expect(compiler('name = "david"\nescreva "Olá {name}"')).toBe('const name = \'david\';\nconsole.log(`Olá ${name}`);');

console.log('- comments');
expect(compiler('# sou apenas um comentario')).toBe('// sou apenas um comentario');
expect(compiler('#outro comentario')).toBe('// outro comentario');
expect(compiler('x = "name"# apenas nome')).toBe('const x = \'name\'; // apenas nome');
expect(compiler('x = 1 # declaração com comentario')).toBe('const x = 1; // declaração com comentario');

console.log('all tests are passed');

console.log('####');
console.log(compiler(`
x = 10                 # Declaração de um valor fixo (não pode ser alterado)
y, z = 20              # Mais de uma variável recebe o mesmo valor y = 20 e z = 20
a, b, c = 1, 2, 3      # Declaração paralela: a = 1, b = 2 e c = 3

var y := 10            # Declaração de uma variável alterável
y := y + 2             # Atribuição de um valor a uma variável
var a, b, c := 1, 2, 3 # Declaração paralela: var a := 1, var b := 2 e var c := 3
a, b, c := b, a, 4     # Atribuição paralela: a := 2, b := 1 e c := 4
`));
console.log('####');
