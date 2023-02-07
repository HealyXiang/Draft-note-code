// 手写JS代码

// 手写判断变量类型
function _typeOf(value) {
  if (value === 'null') {
    return 'null';
  }
  const type = typeof value;
  if (type === 'object') {
    return value instanceof Array ? 'array' : type;
  }
  return type;
}

console.log(_typeOf(44));
console.log(_typeOf('444'));
console.log(_typeOf(true));
console.log(_typeOf(() => {}));
console.log(_typeOf([33]));
console.log(_typeOf({ ff: 44 }));
