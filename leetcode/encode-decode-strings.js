const keyRegex = new RegExp(/(\d+#)/gi);

const encode = (arr) => {
  const encodedStr = arr.reduce(
    (currAggregate, item) => (currAggregate += `${item.length}#${item}`),
    ''
  );

  return encodedStr;
};

const decode = (encodedStr) => {
  const tokens = encodedStr.match(keyRegex);
  const rest = encodedStr.split(keyRegex);

  return rest.filter((item) => !tokens.includes(item) && item !== '');
};

const encoded = encode([
  'an',
  'app0le',
  'aaaa35aa#aa#aaa',
  'day',
  'keeps',
  'dr',
  'away',
]);
console.log('encoded', encoded);
console.log('decoded', decode(encoded));
// fails for cases where delimiter is included in a str, eg, "my#3rules"
