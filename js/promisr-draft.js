function executor(resolve, reject) {
  resolve(100);
}
let demo = new Bromise(executor);

function onResolve(value) {
  console.log(value);
}
demo.then(onResolve);

// 简单版本实现手写Promise
function Bromise(executor) {
  var onResolve_ = null;
  var onReject_ = null;
  // 模拟实现 resolve 和 then，暂不支持 rejcet
  this.then = function (onResolve, onReject) {
    onResolve_ = onResolve;
  };
  function resolve(value) {
    setTimeout(() => {
      onResolve_(value); // 核心，让.then函数接收的回调函数能够异步执行
    }, 0);
  }
  executor(resolve, null);
}

// 手写promise 复杂版本
// 三个状态：PENDING、FULFILLED、REJECTED
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
  constructor(executor) {
    // 默认状态为 PENDING
    this.status = PENDING;
    // 存放成功状态的值，默认为 undefined
    this.value = undefined;
    // 存放失败状态的值，默认为 undefined
    this.reason = undefined;

    // 调用此方法就是成功
    let resolve = (value) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
      }
    };

    // 调用此方法就是失败
    let reject = (reason) => {
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
      }
    };

    try {
      // 立即执行，将 resolve 和 reject 函数传给使用者
      executor(resolve, reject);
    } catch (error) {
      // 发生异常时执行失败逻辑
      reject(error);
    }
  }

  // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value);
    }

    if (this.status === REJECTED) {
      onRejected(this.reason);
    }
  }
}
