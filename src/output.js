const { parseValue } = require('./assigment');

const checkOutput = string => {
  return string.match(/(escreva|imprima) /);
}

const addConsoleLog = value => `console.log(${value});`;

const parseEscreva = (line) => {
  let pipe = line.replace(/(escreva|imprimir) /, '');

  if (line.match(/imprima/)) {
    string = `${parseValue(pipe)}, '\n'`;
  } else {
    string = parseValue(pipe)
  }

  return addConsoleLog(string);
}

module.exports = {
  checkOutput,
  parseEscreva,
};