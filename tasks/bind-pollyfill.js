// Below is the implementation of pollyfill for Function.prototype.bind

const originalBind = Function.prototype.bind;

Function.prototype.bind = function(context, ...args){
    const originalFunc = this;

    return function(...args2){
        context = context ?? globalThis;
        const fnSymbol = Symbol();
        context[fnSymbol] = originalFunc;
        const result = context[fnSymbol](...args, ...args2)
        delete context[fnSymbol];
        return result;
    }
}

// testing the function with sample object and sample function

const sampleObject = {
    name: "Mimansa",
    age: 22
}

function sampleFunc(args){
    console.log(`${this.name} is ${this.age} years old, and is from ${args[0]} which is in ${args[1]}. She is from ${args[2]} domain`);
}

sampleObject.fn = sampleFunc.bind(sampleObject);

sampleObject.fn(["Varanasi", "Uttar Pradesh", "JavaScript"]);