const compiler = require('../src/compiler');

describe('compiler', () => {
  it('assigment', () => {
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
  });

  it('prints', () => {
    expect(compiler('escreva "algo"')).toBe('console.log(\'algo\');');
    expect(compiler('escreva variavel')).toBe('console.log(variavel);');
    expect(compiler('escreva 1')).toBe('console.log(1);');
    expect(compiler('imprima "algo"')).toBe('console.log(\'algo\', \'\n\');');
    // eslint-disable-next-line no-template-curly-in-string
    expect(compiler('name = "david"\nescreva "Olá {name}"')).toBe('const name = \'david\';\nconsole.log(`Olá ${name}`);');
  });

  it('comments', () => {
    expect(compiler('# sou apenas um comentario')).toBe('// sou apenas um comentario');
    expect(compiler('#outro comentario')).toBe('// outro comentario');
    expect(compiler('x = "name"# apenas nome')).toBe('const x = \'name\'; // apenas nome');
    expect(compiler('x = 1 # declaração com comentario')).toBe('const x = 1; // declaração com comentario');
  });
});
