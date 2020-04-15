//  Implemetation of following es5 methods using only 'for' or 'while' loop:
// .forEach
// .map
// .entries
// .filter
// .reduce
// .every
// .some

(function () {
  // -------------------------------------------------
  // Helpers functions

  /**
   * Validates if provided arguments types are correct
   * @param {*} array An array to be validated as type of Array
   * @param {*} callback A function to be validated as type of Function
   */
  const validateArgs = (array, callback) => {
    if (!Array.isArray(array)) {
      throw new TypeError("The provided object 'array' is not an Array");
    }
    // Check if callback is a function
    if (callback && typeof callback != "function") {
      throw new TypeError("The provided object `callback` is not a Function.");
    }
  };

  /**
   * Returns array length as non-negative 32bit integer
   * @param {*} array
   */
  const getLength = (array) => array.length >>> 0;

  // -------------------------------------------------
  // -------------------------------------------------
  // -------------------------------------------------
  // Arrays methods implementations

  /**
   * For each loop executes a provide function once for each array element
   * @param {*} array An array to by cycled through
   * @param {*} callback A function that accepts up to three arguments. Is called one time for each element of the array
   */
  const forEachFn = (array, callback) => {
    validateArgs(array, callback);
    const len = getLength(array);

    for (let i = 0; i < len; i++) {
      // If index exists in array execute callback
      if (i in array) {
        callback(array[i], i, array);
      }
    }
  };

  /**
   * For each loop returns a new element to a new array, does not mutate the provided array
   * @param {*} array
   * @param {*} callback
   * @returns newArray - An array of
   */

  const mapFn = (array, callback) => {
    validateArgs(array, callback);
    const len = getLength(array);

    // Check if callback is a function
    const newArray = new Array(len);

    for (let i = 0; i < len; i++) {
      if (i in array) {
        const ret = callback(array[i], i, array);
        newArray[i] = ret;
      }
    }
    return newArray;
  };

  /**
   * Returns an iterable of key, value pairs for every entry in the array
   * @param {*} array
   * @param {*} callback an optional function that takes the array's element value and returns a new element
   * @returns an iterable object
   */
  const entriesFn = (array, callback) => {
    validateArgs(array, callback);
    const len = getLength(array);
    let index = 0;

    return callback
      ? {
          [Symbol.iterator]() {
            return this;
          },

          next: () =>
            index < len
              ? {
                  value: [index, callback(array[index++])],
                  done: false,
                }
              : {
                  value: [index, callback(array[index])],
                  done: true,
                },
        }
      : {
          [Symbol.iterator]() {
            return this;
          },

          next: () =>
            index < len
              ? { value: [index, array[index++]], done: false }
              : { value: [index, array[index]], done: true },
        };
  };

  /**
   * Returns filtered array based on the condition returned from callback function
   * @param {*} array
   * @param {*} callback
   */
  const filterFn = (array, callback) => {
    validateArgs(array, callback);
    const len = getLength(array);
    let newArr = [];

    for (let i = 0; i < len; i++) {
      if (i in array) {
        if (callback(array[i], i, array)) {
          newArr.push(array[i]);
        }
      }
    }
    return newArr;
  };

  /**
   * Executes a reducer function (that you provide) on each element of the array, resulting in a single output value
   * @param {*} array
   * @param {*} callback A function to execute on each element in the array (except for the first, if no initialValue is supplied)
   * @param {*} initial |Optional A value to use as the first argument to the first call of the callback
   */
  const reduceFn = (array, callback, initial) => {
    validateArgs(array, callback);
    const len = getLength(array);
    if ((initial && initial < 0) || initial >= len) {
      throw TypeError(
        "The procided initial value has to be a positive number and cannot be bigger or equal the length of array."
      );
    }

    let accumulator;
    let i;

    if (len > 1) {
      accumulator = array[0];
      i = initial ? initial : 1;

      for (; i < len; i++) {
        // If index exists in array execute callback
        if (i in array) {
          accumulator = callback(accumulator, array[i], i, array);
        }
      }
    } else if (len === 1) {
      accumulator = array[0];
    } else {
      throw new Error("Reduce of empty array");
    }

    return accumulator;
  };

  /**
   * Tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
   * @param {*} array
   * @param {*} callback A function to test for each element, taking three arguments
   */
  const everyFn = (array, callback) => {
    validateArgs(array, callback);
    const len = getLength(array);

    let bool = true;
    let i = 0;

    while (i < len && bool) {
      if (i in array) {
        bool = callback(array[i], i, array);
      }
      i++;
    }

    return bool;
  };

  /**
   * Tests whether at least one element in the array pass the test implemented by the provided function. It returns a Boolean value.
   * @param {*} array
   * @param {*} callback A function to test for each element, taking three arguments
   */
  const someFn = (array, callback) => {
    validateArgs(array, callback);
    const len = getLength(array);

    let bool = false;
    let i = 0;

    while (i < len && !bool) {
      if (i in array) {
        bool = callback(array[i], i, array);
      }
      i++;
    }

    return bool;
  };
})();
