const { printTitle } = require("./utils");

let o;

// 01 - array proxy

printTitle("01 - array proxy");

const l = new Proxy([1], {
  get: function(target, key) {
    console.log(`Getting index: ${key}`);
    return Reflect.get(target, key);
  },
  set: function(target, key, value) {
    console.log(`Setting index ${key} of value ${value}`);
    return Reflect.set(target, key, value);
  }
});

console.log(Array.isArray(l)); // true
l[0];
l.push(1);

// 02 - default value

printTitle("02 - default value");

function createDefault(defaults) {
  const handler = {
    get(obj, key) {
      return Reflect.get(obj, key) || defaults[key];
    }
  };

  return new Proxy({}, handler);
}

o = createDefault({ name: "leo" });

console.log(o.name);
o.name = "clinyong";
console.log(o.name);

// 03 - private properties

printTitle("03 - private properties");

const RESTRICTED = ["_apiKey"];
let api = {
  _apiKey: "123abc456def",
  /* mock methods that use this._apiKey */
  getUsers: function() {},
  getUser: function(userId) {},
  setUser: function(userId, config) {}
};
api = new Proxy(api, {
  get(target, key) {
    if (RESTRICTED.includes(key)) {
      throw `${key} is restricted.`;
    }
    return Reflect.get(target, key);
  },
  set(target, key, value) {
    if (RESTRICTED.includes(key)) {
      throw `${key} is restricted.`;
    }
    return Reflect.set(target, key, value);
  },
  has(target, key) {
    return RESTRICTED.includes(key) ? false : Reflect.has(target, key);
  }
});

try {
  console.log(api._apiKey);
} catch (e) {
  console.log(e);
}

try {
  console.log((api._apiKey = ""));
} catch (e) {
  console.log(e);
}

// 04 - validate value

printTitle("04 - validate value");

const allNum = new Proxy(
  {},
  {
    set(target, key, value) {
      if (typeof value !== "number") {
        throw "Properties must be numbers";
      }
      Reflect.set(target, key, value);
    }
  }
);

try {
  allNum.price = "0";
} catch (e) {
  console.log(e);
}

allNum.price = 0;
