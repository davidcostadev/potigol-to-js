const { checkComments, parseComments, getComment, removeComments } = require('./comments');

const isString = value => value.match(/(["]|['])/);

const assigmentCore = ([ name, value ]) => `${name} = ${parseValue(value)}`

const assigmentConstant = (data) => `const ${assigmentCore(data)}`;
 
const assigmentSimple = (data) => `let ${assigmentCore(data)}`;

const checkString = value => {
  if (isString(value)) {
    return value.match(/("|')(.*?)("|')/)[0]
  }

  return ''
}

const addSemicolor = s => {
  if (!s.match(/[;]/g)) {
    return `${s};`
  }

  return s;
};

const interpolation = (string, value) => {
  if (string.match(/[{]/g)) {
    const value = string.match(/[{](.*?)[}]/)[1];
    string = string.replace(`{${value}}`, `\${${value}}`)

    return `\`${string}\``;
  }

  return string;
}

const parseValue = value => {
  if (isString(value)) {
    let string = value.match(/("|')(.*?)("|')/)[2]
    
    if (string.match(/[{]/g)) {
      const value = string.match(/[{](.*?)[}]/)[1];
      string = string.replace(`{${value}}`, `\${${value}}`)

      string = `\`${string}\``;
    } else {
      string = `'${string}'`;
    }
    

    if (checkComments(value)) {
      string = [
        addSemicolor(string),
        getComment(value)
      ].join(' ');
    }

    return string;
  }

  return value;
}

const compressAfter = (string) => {
  if (checkComments(string)) {
    return string;
  }
  return  string.replace(/[ ]/g, '')
}

const compressAssigment = s => s.replace(/var /g, '').replace(/[ ]/g, '');

const compressLine = (line) => {
  const matchesWithString = line.match(/^(.*?)(['"].*?["'])(.*?)(|(#(| ).*?))$/u);

  if (matchesWithString) {
    const newLine = [
        matchesWithString[1].replace(/[ ]/g, ''),
        matchesWithString[2],
       compressAfter(matchesWithString[3]),
       compressAfter(matchesWithString[4]),
      ]
      .filter(x => x.length).join(' ');

      return newLine;
  }

  
  if (checkComments(line)) {
    const comments = getComment(line);
    return compressAssigment(removeComments(line))+ '; ' + comments;
  }
  return compressAssigment(line)
}

const checkAssigment = (string) => {
  if (string.match(/[:][=]/g)) {
    return ':=';
  }
  if (string.match(/[=]/g)) {
    return '=';
  }
  
  return null;
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
  }).map(addSemicolor).join('')
}

module.exports = {
  checkAssigment,
  assigment,
  parseValue,
}