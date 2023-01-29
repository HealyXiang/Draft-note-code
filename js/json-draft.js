console.log(JSON.stringify({ x: 5, y: 6 }));
// Expected output: "{"x":5,"y":6}"

console.log(JSON.stringify([new Number(3), new String('false'), new Boolean(false)]));
// Expected output: "[3,"false",false]"

console.log(JSON.stringify({ x: [10, undefined, function () {}, Symbol('')] }));
// Expected output: "{"x":[10,null,null,null]}"

console.log(JSON.stringify(new Date(2006, 0, 2, 15, 4, 5)));
// Expected output: ""2006-01-02T15:04:05.000Z""

let obj = {
  a: undefined,
  b() {
    return 'bbbb';
  },
  c: Symbol(),
  e: 'normal',
};

console.log(JSON.stringify(obj));
// '{"e":"normal"}'

let arr = [
  undefined,
  function aa() {
    return 33333;
  },
  Symbol('dddd'),
];

console.log(JSON.stringify(arr));
// '[null,null,null]'

JSON.stringify(function () {});
// undefined

JSON.stringify(undefined);
// undefined

JSON.stringify(Symbol());
// undefined

JSON.stringify({ [Symbol('foo')]: 'foo' });
// '{}'
