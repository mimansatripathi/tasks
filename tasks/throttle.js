// Implementation of throttle function with immediate and trailling options

const throttleFunc = ()=>console.log("throttle called");

function myThrottle(fn, delay, {leading = false, trailing = true}=options){
    let lastArgs, lastContext;
    let timerId = null;
    let lastInvokeTime = 0;

    function invoke(time){
        lastInvokeTime = time;
        fn.apply(lastContext, lastArgs)
        lastArgs = lastContext = null;
    }

    return function(...args){
        lastArgs = args;
        const now = Date.now();
        lastContext = this;

        let timeSinceLastInvoke = now - lastInvokeTime;
        const remainingTime = delay - timeSinceLastInvoke;

        if(leading === true && lastInvokeTime ===0){
            invoke(now);
            return;
        }
        if(remainingTime <= 0){
            if(timerId){
                clearTimeout(timerId);
                timerId = null;
            }
            invoke(now);
        }
        else if(trailing && !timerId){
            timerId = setTimeout(() => {
                timerId = null;
                invoke(Date.now());
            }, remainingTime);
        }
    }
}