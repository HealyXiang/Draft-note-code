const sayName = require('./hello.js');

console.log('module in home:', module);

console.log('exports in home:', exports);

console.log('__dirname:', __dirname);

console.log('__filename:', __filename);

console.log('process.cwd():', process.cwd());

module.exports = function say() {
  return {
    name: sayName(),
    author: '我不是外星人',
  };
};
