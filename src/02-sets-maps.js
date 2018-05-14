// Use Set to check if a value is present.
// Use Map to retrieve value.

const { printTitle } = require("./utils");

printTitle("set with different type");

const set1 = new Set();
set1.add(5);
set1.add("5");
console.log(set1.size); // 2

printTitle("set with object key");

const set2 = new Set();
set2.add({});
set2.add({});

console.log(set2.size); // 2;

printTitle("set with same key");
const set3 = new Set();
set3.add(5);
set3.add(5);
set3.add(5);

console.log(set3.size); // 1

printTitle("init with array");
const set4 = new Set([1, 2, 3, 4, 5, 5, 5]);
console.log(set4.size); // 5

printTitle("other api");
const set5 = new Set();
set5.add(5);
console.log(set5.has(5)); // true

set5.delete(5);
console.log(set5.size); // 0

printTitle("forEach");
const set6 = new Set([1, 2]);
set6.forEach((val, key) => {
  console.log(`${val} ${key}`);
  console.log(val === key); // true
});

const processor = {
  output(val) {
    console.log(val);
  },

  process(dataSet) {
    dataSet.forEach(function(val) {
      this.output(val);
    }, this); // bind this
  }
};
processor.process(set6);

printTitle("convert set to array");
const set7 = new Set([1, 2, 3, 3, 3]);
console.log(Array.from(set7)); // [1, 2, 3]
console.log([...set7]); // [1, 2, 3]

printTitle("weak set");
let set8 = new Set(),
  key = {};

set8.add(key);
console.log(set8.has(key)); // true

key = null;
key = [...set8][0]; // get back the reference

let set9 = new WeakSet();

set9.add(key);
key = null; // 当 WeakSet 里面保存的值，外部没有任何对象引用它，这个值会从 WeakSet 里面删除。尽管我们测试不了这种结果。

// WeakSet do not have `forEach` and `size` methods.
console.log(typeof set9.size); // undefined
console.log(typeof set9.forEach); // undefined

// WeakSet can not add primitive value
try {
  set9.add(1);
} catch (e) {
  console.log("Invalid value used in weak set");
}
try {
  set9 = new WeakSet([1, 2]);
} catch (e) {
  console.log("Invalid value used in weak set");
}
