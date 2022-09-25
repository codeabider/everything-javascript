const twoSum = (nums, target) => {
  const indices = [];

  nums.forEach((item, index) => {
    const remainder = target - item;
    const remainderIndex = nums.indexOf(remainder);

    if (
      remainderIndex > -1 &&
      index !== remainderIndex &&
      indices.indexOf(index) === -1 &&
      indices.indexOf(remainderIndex) === -1
    ) {
      indices.push(index);
      indices.push(remainderIndex);
    }
  });

  return indices;
};

/*
alternate, using map:

var twoSum = function (nums, target) {
    let map = {};
    for (let i = 0; i < nums.length; i++) {
        if (target - nums[i] in map) {
            return [map[target - nums[i]], i];
        } else {
            map[nums[i]] = i;
        }
    }
};
*/

console.log(twoSum([2, 11, 7, 15], 26));
console.log(twoSum([3, 2, 4], 6));
console.log(twoSum([3, 3], 6));
console.log(twoSum([0, 4, 3, 0], 0));
console.log(twoSum([-1, -2, -3, -4, -5], -8));
console.log('<---------->');
