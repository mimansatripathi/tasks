// Below is the implementation of custom deep clone function that handles circular reference


function deepClone(value, seen=new Map()){

    //handle variable, function, null
    if(typeof value !== "object" || value === null) return value;

    //handles circular reference
    if(seen.has(value)) return seen.get(value); 

    //handle array
    if(Array.isArray(value)){
        let tempArr = [];
        seen.set(value, tempArr);
        for(let n of value){
            tempArr.push(deepClone(value, seen));
        }
        return tempArr;
    }

    //handle date
    if(value instanceof Date) return new Date(value);

    //handle map
    if(value instanceof Map){
        let tempMap = new Map();
        seen.set(value, tempMap);
        for(let [k, v] in value){
            tempMap.set(deepClone(k, seen), deepClone(v, seen));
        }
        return tempMap;
    }

    //handle set
    if(value instanceof Set){
        let tempSet = new Set();
        seen.set(value, tempSet);
        for(let k in value){
            tempSet.add(deepClone(k, seen));
        }
        return tempSet;
    }

    //handle object
    const tempObj = {};
    seen.set(value, tempObj);
    for(let key in value){
        if(value.hasOwnProperty(key)){
            tempObj[key] = deepClone(value[key], seen);
        }
    }
    return tempObj;
}


// testing with sample object

const originalObject = {
    a: 20,
    b: "mimansa",
    c: function(){
        setTimeout(() => {
            console.log("inside a timeout function: c");
        }, 2000);
    },
    d: {
        da: "first object inside d",
        db: {
            dba: "a furthur nested object",
            dbb: ()=>console.log("inside a->d->db->dbb")
        },
        dc: new Set(['a', 'a', 'b', 'c'])
    },
    e: new Map([[1, 'a'], [2, 'b'], [3, 'z']])
}

const copiedObject = deepClone(originalObject);

originalObject.a = 40;
copiedObject.c = function(){
    console.log("c changed in copied");
}
console.log("original object: ", originalObject);
console.log("copied object: ", copiedObject);
originalObject.c();
copiedObject.c();

//both object's c has different implementation. and value of a is different in both. thus deep cloning is done.