const containsDuplicate = (arr) => {
    return new Set(arr).size !== arr.length;
}

// alternate: use hashMap obj to keep a track of occurrences of each item

console.log(containsDuplicate([1, 2, 1, 1, 3]));
console.log('<---------->');