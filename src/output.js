const { parseValue } = require('./assigment');

const checkOutput = string => string.match(/(escreva|imprima) /);

const addConsoleLog = value => `console.log(${value});`;

const parseEscreva = (line) => {
  const pipe = line.replace(/(escreva|imprimir) /, '');

  if (line.match(/imprima/)) {
    string = `${parseValue(pipe)}, '\n'`;
  } else {
    string = parseValue(pipe);
  }

  return addConsoleLog(string);
};

module.exports = {
  checkOutput,
  parseEscreva,
};
