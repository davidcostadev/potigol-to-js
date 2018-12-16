const {
  assigment,
  checkAssigment,
} = require('./assigment');
const {
  checkOutput,
  parseEscreva,
} = require('./output');
const { parseComments } = require('./comments');

const splitLines = string => {
  const lines = string.split('\n').filter(line => line.length);

  return lines
}

const checkLine = (line) => {
  
  if (checkAssigment(line)) {
    return assigment(line)
  }
  
  if (checkOutput(line)) {
    return parseEscreva(line);
  }
  
  line = parseComments(line);
  

  return line
}

const compiler = (string) => {
  const pipe = splitLines(string).map(checkLine).join('\n');
  return pipe;
}

module.exports = compiler
