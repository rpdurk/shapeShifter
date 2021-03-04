class Util {
  static deepCopyArray(a) {
    let outObject, value, key

    if (typeof a !== "object" || a === null) {
      return a // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(a) ? [] : {}

    for (key in a) {
      value = a[key]

      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = Util.deepCopyArray(value)
    }

    return outObject
  }

  static test(a) {
    var b = Util.deepCopyArray(a);
    b[0] = "a";
    console.log(a);
    console.log(b);
  }
}

export default Util;
