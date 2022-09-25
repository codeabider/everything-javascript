// const hasDuplicates = (arr) => {
//   const duplicateMap = new Map();
//   const regexNumbers = /^[0-9]$/;

//   for (let i = 0; i < arr.length; i++) {
//     if (regexNumbers.test(arr[i])) {
//       let curr = duplicateMap.get(arr[i]);

//       if (curr) {
//         duplicateMap.set(arr[i], curr++);
//       } else {
//         duplicateMap.set(arr[i], 1);
//       }

//       if (curr > 1) {
//         return true;
//       }
//     }
//   }

//   return false;
// };
// console.log(hasDuplicates(['1', '2', '1', '3', '4', '5', '2']));

// Note: Set maybe faster than array
const isValidSudoku = (board) => {
  const rowMap = {};
  const colMap = {};
  const squareMap = {};

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const currentNum = board[row][col];
      const squareGrid = `${Math.floor(row / 3)}${Math.floor(col / 3)}`;

      if (currentNum === '.') {
        continue;
      }

      if (!rowMap[row]) {
        rowMap[row] = [];
        // rowMap[row] = new Set();
      }

      if (!colMap[col]) {
        colMap[col] = [];
        // colMap[col] = new Set();
      }

      if (!squareMap[squareGrid]) {
        squareMap[squareGrid] = [];
        // squareMap[squareGrid] = new Set();
      }

      if (
        rowMap[row].includes(currentNum) ||
        // rowMap[row].has(currentNum) ||
        colMap[col].includes(currentNum) ||
        // colMap[col].has(currentNum) ||
        squareMap[squareGrid].includes(currentNum)
        // squareMap[squareGrid].has(currentNum)
      ) {
        return false;
      }

      rowMap[row].push(currentNum);
      // rowMap[row].add(currentNum);
      colMap[col].push(currentNum);
      // colMap[col].add(currentNum);
      squareMap[squareGrid].push(currentNum);
      // squareMap[squareGrid].add(currentNum);
    }
  }
  console.log({ rowMap, colMap, squareMap });

  return true;
};

console.log(
  isValidSudoku([
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ])
);
console.log('----------------------------------');
console.log(
  isValidSudoku([
    ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ])
);
