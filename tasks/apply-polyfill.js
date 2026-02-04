// Below is the implementation of pollyfill for Function.prototype.apply

const originalApply = Function.prototype.apply;

Function.prototype.apply = function(context, ...args){
    context = context ?? globalThis;
    const fnSymbol = Symbol();
    context[fnSymbol] = this;
    let result = (args.length>0) ?context[fnSymbol]([...args]) : context[fnSymbol]([]);
    delete context[fnSymbol];
    return result;
}

// testing the function with sample object:

const sampleObject = {
    name: "Mimansa",
    age: 22
}

function sampleFunc(args){
    console.log(`${this.name} is ${this.age} years old, and is from ${args[0]} which is in ${args[1]}. She is from ${args[2]} domain`);
}

const argsArr = ["Varanasi", "Uttar Pradesh", "JavaScript"];

sampleFunc.apply(sampleObject, ...argsArr);