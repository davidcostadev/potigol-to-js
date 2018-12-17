const checkComments = line => line.match(/^.*?([#]( |).*?)$/u);

const addComent = string => `// ${string}`;

const getComment = (string) => {
  if (checkComments(string)) {
    const comment = string.trim().split('#')[1];

    return addComent(comment.trim());
  }

  return '';
};

const removeComments = (string) => {
  if (checkComments(string)) {
    const [before] = string.trim().split('#');

    return before.trim();
  }

  return '';
};

const parseComments = (string) => {
  if (checkComments(string)) {
    const [before, comment] = string.trim().split('#');
    let a = [
      before,
      comment.trim(),
    ]
      .filter(s => s.length);

    if (a.length === 1) {
      return `// ${a}`;
    }

    a = a.join('#')
      .trim()
      .replace(/#/, '// ');

    return a;
  }

  return string;
};

module.exports = {
  checkComments,
  getComment,
  parseComments,
  removeComments,
};
