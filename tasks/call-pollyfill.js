// Below is the implementation of pollyfill for Function.prototype.call

const originalCall = Function.prototype.call;

Function.prototype.call = function(context, ...args){
    context = context ?? globalThis;
    const fnSymbol = Symbol();
    context[fnSymbol] = this;
    const result = context[fnSymbol](...args)
    delete context[fnSymbol];
    return result;
}

// Testing the function: 

const sampleObject = {
    name: "Mimansa",
    age: 22
}

function sampleFunc(city){
    console.log(`${this.name} is ${this.age} years old, and is from ${city}.`);
}

sampleFunc.call(sampleObject, "Varanasi");