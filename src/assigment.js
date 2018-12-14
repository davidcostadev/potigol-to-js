
const assigmentCore = ([ name, value ]) => `${name} = ${value}`

const assigmentConstant = (data) => `const ${assigmentCore(data)}`;

const assigmentSimple = (data) => `let ${assigmentCore(data)}`;

const compressLine = (line) => {
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
  
  return '';
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

module.exports = assigment