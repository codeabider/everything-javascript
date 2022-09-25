// const topKFrequent = (nums, k) => {
//   const map = {};

//   nums.forEach((num) => {
//     if (map[num]) {
//       map[num] += 1;
//     } else {
//       map[num] = 1;
//     }
//   });

//   const sortedOccurrenceArr = Object.values(map)
//     .sort((a, b) => b - a)
//     .slice(0, k);

//   return sortedOccurrenceArr.map((item) => {
//     return +Object.keys(map).find((key) => map[key] === item);
//   });
// };

const topKFrequent = (nums, k) => {
  const map = new Map();
  const result = [];

  nums.forEach((num) => {
    if (map.get(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  });

  const sortedOccurrenceArr = [...map.values()]
    .sort((a, b) => b - a)
    .slice(0, k);

  for (const [key, val] of map) {
    if (sortedOccurrenceArr.includes(val)) {
      result.push(key);
    }
  }

  return result;
};

console.log(topKFrequent([21, 1, 1, 1, 21, 3, 3, 3, 3, 3, 3, 3, 3], 2));
console.log(topKFrequent([1], 1));
