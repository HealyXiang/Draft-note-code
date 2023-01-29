// 防抖
/* 
防止抖动。延迟执行，一直触发事件一直不执行，当停止触发事件n秒后才执行。
若在触发事件后的n秒内又触发了事件，则从新触发事件开始重新计时，n秒后执行。
*/

function debounce(callback, duration = 5*1000, immediate = false) {
    let timer = null
    function resCb(params) {
        if (!timer && immediate) {
            // immediate为true，第一次触发事件，必须执行
            callback(params)
            timer = 1 // 标记timer，下次触发事件才会进入else逻辑
        } else {
            clearTimeout(timer)
            timer = setTimeout(() => {
                callback(params)
                clearTimeout(timer)
            }, duration)
        }
    }

    return resCb
}

function onChange(arg1) {
    console.log(arg1)
}

let debouncedOnChange = debounce(onChange, 1000, true)

// debouncedOnChange(1,99)
// debouncedOnChange(2)
// debouncedOnChange(3)
// debouncedOnChange(4)
// debouncedOnChange(5)
// debouncedOnChange(6)
// debouncedOnChange(7)
// debouncedOnChange(8,99)


// 节流

/* 
n秒内只执行一次，n秒内多次触发事件，只执行一次。会稀释事件的频率。
*/

// 定时器版本
function throttle(event, duration = 5000) {
    let gate = true
    let timer = null
    return function (params) {
        gate && event(params)
        gate = false;
        setTimeout(() => {
            gate = true
            clearTimeout(timer)
        }, duration)
    }
}

// 时间戳版本
function throttleWithTimer(event, duration = 5000) {
    let lastCallTime = 0
    return function (params) {
        const nowTime = Date.now()
        if (nowTime - lastCallTime >= duration) {
            event(params)
            lastCallTime = nowTime
        }
    }
}

// let throttleOnChange = throttle(onChange, 1000, true)
let throttleOnChange = throttleWithTimer(onChange, 1000, true)


throttleOnChange(1,99)
throttleOnChange(2)
throttleOnChange(3)
throttleOnChange(4)
throttleOnChange(5)
throttleOnChange(6)
throttleOnChange(7)
throttleOnChange(8,99)

setTimeout(() => {
    throttleOnChange(1,99)
    throttleOnChange(2)
    throttleOnChange(3)
    throttleOnChange(4)
    throttleOnChange(5)
    throttleOnChange(6)
    throttleOnChange(7)
    throttleOnChange(8,99)
}, 1000)