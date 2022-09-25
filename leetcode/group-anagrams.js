const groupAnagrams = (arr) => {
  const map = new Map();

  arr.forEach((str) => {
    const alphaStr = str.split('').sort().join('');

    if (map.get(alphaStr)) {
      map.get(alphaStr).push(str);
    } else {
      map.set(alphaStr, []);
    }
  });

  return [...map.values()];
};

const groupAnagrams2 = (arr) => {
  const map = {};

  arr.forEach((str) => {
    const alphaStr = str.split('').sort().join('');

    if (map[alphaStr]) {
      map[alphaStr].push(str);
    } else {
      map[alphaStr] = [str];
    }
  });

  return Object.values(map);
};

console.log(groupAnagrams(['eat', 'bat', 'tea', 'tan', 'ate', 'nat']));
console.log(groupAnagrams(['a']));
console.log(groupAnagrams(['']));
console.log('<---------->');
