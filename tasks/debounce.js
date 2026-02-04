// Implementation of debounce function with immediate and trailling options

const debounceFunction = ()=>console.log("debounce called");

function myDebounce(fn, delay, obj={}){
    let timer = null;
    let lastContext, lastArgs;
    const {leading = false, trailing = true} = false;

    return function(...args){
        lastArgs = args;
        lastContext = this;
        const isLastCall = !timer;

        if(isLastCall && leading) fn.apply(lastContext, lastArgs);

        clearTimeout(timer);

        timer = setTimeout(() => {
            if(trailing && (!leading || !isLastCall)) fn.apply(lastContext, lastArgs);
            timer = null;
        }, delay);
    }
}

const debouncedFunction = myDebounce(debounceFunction, 800, {leading: true, trailing: true}) //default behaviout

// example: document.querySelector('#input-box').addEventListner('keypress', debouncedFunction);