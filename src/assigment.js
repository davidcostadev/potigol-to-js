const checkString = value => {
  if (value.match(/(["]|['])/)) {
    return value.match(/("|')(.*?)("|')/)[0]
  }

  return ''
}

const parseValue = value => {
  if (value.match(/(["]|['])/)) {
    let string = value.match(/("|')(.*?)("|')/)[2]

    if (string.match(/[{]/g)) {
      const value = string.match(/[{](.*?)[}]/)[1];
      string = string.replace(`{${value}}`, `\${${value}}`)

      return `\`${string}\``;
    }
    
    return `'${string}'`;
  }
  
  return value;
}

const assigmentCore = ([ name, value ]) => `${name} = ${parseValue(value)}`

const assigmentConstant = (data) => `const ${assigmentCore(data)}`;

const assigmentSimple = (data) => `let ${assigmentCore(data)}`;

const compressLine = (line) => {
  const separetedString = checkString(line);
  const matches = line.match(/^(.*?)(['"].*?["'])(.*?)$/u);
  if (matches) {
    const newLine = [matches[1].replace(/[ ]/g, ''), matches[2], matches[3].replace(/[ ]/g, '')]
      .filter(x => x.length).join(' ');

      return newLine;
  }
  const a = line.replace(/var /g, '').replace(/[ ]/g, '');
  return a
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
  }).join(';') + ';'
}

module.exports = {
  checkAssigment,
  assigment,
  parseValue,
}