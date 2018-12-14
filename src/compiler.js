const assigment = require('./assigment');

const splitLines = string => {
  const lines = string.split('\n').filter(line => line.length);

  return lines
}

const compiler = (string) => {
  const pipe = splitLines(string).map(assigment).join('\n');
  return pipe;
}

module.exports = compiler
