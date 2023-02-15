const say = require('./a');
const object = {
  name: '《React进阶实践指南》',
  author: '我不是外星人',
};
console.log('say in b file:', say);
console.log('我是 b 文件');
// console.log('module in b:', module);

module.exports = function () {
  return object;
};
