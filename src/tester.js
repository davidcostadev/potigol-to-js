const compiler = require('./compiler');


console.log(compiler(`
x = 10                 # Declaração de um valor fixo (não pode ser alterado)
y, z = 20              # Mais de uma variável recebe o mesmo valor y = 20 e z = 20
a, b, c = 1, 2, 3      # Declaração paralela: a = 1, b = 2 e c = 3

var y := 10            # Declaração de uma variável alterável
y := y + 2             # Atribuição de um valor a uma variável
var a, b, c := 1, 2, 3 # Declaração paralela: var a := 1, var b := 2 e var c := 3
a, b, c := b, a, 4     # Atribuição paralela: a := 2, b := 1 e c := 4
`));
