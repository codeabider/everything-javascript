// const productExceptSelf = (nums) => {
//   const result = [];

//   nums.forEach((_, index) => {
//     for (let i = 0; i < nums.length; i++) {
//       if (i !== index) {
//         result[index] = (result[index] == null ? 1 : result[index]) * nums[i];
//       }
//     }
//   });

//   return result;
// };

const productExceptSelf = (nums) => {
  const resultArr = [];
  let productTillNow = 1;

  for (let i = 0; i < nums.length; i++) {
    resultArr[i] = productTillNow;
    productTillNow *= nums[i];
  }
  // console.log("forward -->", resultArr, productTillNow);
  productTillNow = 1;

  for (let j = nums.length - 1; j >= 0; j--) {
    resultArr[j] *= productTillNow;
    productTillNow *= nums[j];
  }
  //   console.log("reverse -->", resultArr, productTillNow);

  return resultArr;
};

console.log(productExceptSelf([4, 3, 2, 1, 2]));
/*
res = [12,16,24,48,24]

(product to the left of current num)
forward loop --> [1, 4, 12, 24, 24]
        p    --> 4, 12, 24, 24, 48 | reset to 1

(product to the right of current num)
reverse loop --> [24, 48, 24, 16, 12] <--> [12, 16, 24, 48, 24]
        p    --> 2, 2, 4, 12, 48

L  - N - R  - L*R
1  - 4 - 12 - 12
4  - 3 - 4  - 16
12 - 2 - 2  - 24
24 - 1 - 2  - 48
24 - 2 - 1  - 24
*/
console.log(productExceptSelf([1, 2, 3, 4]));
console.log(productExceptSelf([10, 2, 0, 4]));
console.log(productExceptSelf([-1, 1, 0, -3, 3]));
