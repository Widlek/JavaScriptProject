function sum(string) {
  let array = string.split("; ");
  let result = 0;

  for (el of array) {
    intEl = Number(el);
    result += intEl;
  }
  console.log("res: ", result);
  return result;
}

module.exports = sum;
