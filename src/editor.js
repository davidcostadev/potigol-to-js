import compiler from './compiler';
console.log('editor');


let editor = ace.edit('editor');
editor.setTheme('ace/theme/monokai');
editor.getSession().setMode('ace/mode/potigol');


let output = ace.edit('output');
output.setOptions({
  readOnly: true,
  highlightActiveLine: false,
  highlightGutterLine: false,
});
output.setTheme('ace/theme/monokai');
output.getSession().setMode('ace/mode/javascript');

const compileIt = () => output.setValue(compiler(editor.getValue()));

window.addEventListener('load', compileIt);

editor.on('change', compileIt);
