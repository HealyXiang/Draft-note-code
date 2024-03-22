//防抖
// 只能基于定时器
function debounce(fn, delay  = 400) {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args);
        }, delay);

    }
}

let print = debounce((aa) => {
    console.log('debounce:',aa)
}, 100)

// print('1')
// print('2')
// print('3')
// print('4')

setTimeout(() => print('1'), 10)
setTimeout(() => print('1'), 20)
setTimeout(() => print('1'), 30)
setTimeout(() => print('2'), 120)
setTimeout(() => print('3'), 210)
setTimeout(() => print('4'), 320)


// setTimeout(() => print('1'), 10)
// setTimeout(() => print('2'), 20)
// setTimeout(() => print('3'), 110)
// setTimeout(() => print('4'), 120)

// 节流可以基于 时间戳 或 定时器
// 非定时器写法
function throttleTimestamp(fn, delay  = 400) {
    let last = 0;
    return function (...args) {
        if (last === 0) {
            last = Date.now();
        }
        if (Date.now() - last > delay) {
            fn(...args);
            last = Date.now();
        }
    }
}

// 定时器写法
// 用定时器挡住不在间隔内的函数执行，防止频繁触发
function throttle(fn, delay = 400, isFirstCall = true) {
    let canRun = isFirstCall
    let timer = null
    if (!canRun) {
        timer = setTimeout(() => {
            canRun = true;
        }, delay);
    }
    console.log('canRun canRun:',canRun)
    return function (...args) {
        if (canRun) {
            fn(...args);
            clearTimeout(timer);
            canRun = false;
            timer = setTimeout(() => {
                canRun = true;
            }, delay);
        }
    }
}

const throttledFunction = throttle((a) => {
    console.log(a);
}, 100);

// throttledFunction('2')
// throttledFunction('3')
// throttledFunction('4')
// throttledFunction('5')
// setTimeout(() => throttledFunction('1'), 10)
// setTimeout(() => throttledFunction('2'), 20)
// setTimeout(() => throttledFunction('3'), 30)
// setTimeout(() =>  throttledFunction('4'), 40)

// setTimeout(() =>  throttledFunction('5'), 102)
// setTimeout(() =>  throttledFunction('6'), 200)


// deep copy深拷贝
function deepCopy(obj, map = new WeakMap()) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (map.has(obj)) {
        return map.get(obj)
    }
    let copy = Array.isArray(obj) ? [] : {};
    map.set(obj, copy)
    Object.keys(obj).forEach((key) => {
        copy[key] = deepCopy(obj[key], map);
    })
    return copy;
}

let oldObj = { a: [2, 3, 4], b: { bb: 11, bc: 4444, cc: { ff: { lll: 999 } } } }

let newObj = deepCopy(oldObj)

console.log(oldObj === newObj)

// compose函数
function compose(fn1, fn2) {
    return function (arg) {
         fn1(fn2(arg))
     }
}
 
function curry(f) { // curry(f) 执行柯里化转换
    return function(a) {
        return function(b) {
        return f(a, b);
        };
    };
}

function sum(a, b) {
    return a + b;
}
  
let curriedSum = curry(sum);
console.log(curriedSum(1)(2))

// 手写bind函数

Function.prototype.myBind = function (newThis) {
    // this = myThis;
    const bindArgs = [...arguments].slice(1)
    const fn = this;

    return function Fn (...args) {
        fn.apply(this instanceof Fn ? new fn(...args) :  newThis, [...bindArgs,...args])
    }
}

// 手写new 构造函数

function myNew(Func, ...args) {
    const obj = {}

    obj.__proto__ = Func.prototype    

    let result = Func.apply(obj, args)
    
    return result instanceof Object ? result : obj
}
