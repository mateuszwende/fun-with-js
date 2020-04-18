// Implementation of some Promise methods:
// .all()
// .race()
// and implementation of new ones:
// promiseLast() - returns the last resolved promise, if error, rejects the error
// promiseIgnoreErrors() - returns only resolved promises

(function () {
  // -------------------------------------------------
  // Helpers functions

  const isEmptyArray = (array) =>
    !(Array.isArray(array) && arrayOfPromises.length);

  const isArray = (array) => Array.isArray(array);

  const getArrayLength = (array) => array.length >>> 0;

  const promise1 = new Promise((resolve, reject) => {
    setTimeout(
      () => resolve({ message: "First promise resolved", done: true }),
      1500
    );
  });

  const promise2 = new Promise((resolve, reject) => {
    setTimeout(
      () =>
        reject({
          message: "Second promise rejected",
          done: true,
        }),
      1000
    );
  });

  const promise3 = new Promise((resolve, reject) => {
    setTimeout(
      () => resolve({ message: "Third promise resolved", done: true }),
      3000
    );
  });

  const arrayOfPromises = [promise1, promise2, promise3];

  // -------------------------------------------------
  // IMPLEMENTATION
  // -------------------------------------------------

  /**
   * Returns a single Promise that fulfills when all of the promises
   * passed as an array have been fulfilled or when the array contains no promises or when
   * the array contains promises that have been fulfilled and non-promises that have been returned.
   * It rejects with the reason of the first promise that rejects, or with the error caught by the
   * first argument if that argument has caught an error inside it using try/catch/throw blocks.
   * @param {*} arrayOfPromises
   */
  const promiseAll = (arrayOfPromises) => {
    if (!isArray(arrayOfPromises)) {
      throw Error("The provided object is not an Array");
    }
    return new Promise((resolve, reject) => {
      if (isEmptyArray(arrayOfPromises)) {
        resolve(arrayOfPromises);
      } else {
        const len = getArrayLength(arrayOfPromises);
        let values = [];
        let index = 0;

        for (const promise of arrayOfPromises) {
          Promise.resolve(promise)
            .then((res) => {
              values.push(res);
              index++;

              if (index === len) {
                resolve(values);
              }
            })
            .catch((err) => reject(err));
        }
      }
    });
  };

  // -------------------------------------------------
  // TEST
  // const p_arr = promiseAll(arrayOfPromises);
  // console.log(p_arr);
  // setTimeout(() => {
  //   console.log("The stack is empty");
  //   console.log(p_arr);
  // }, 4000);
  // -------------------------------------------------

  const promiseRace = (arrayOfPromises) => {
    if (!isArray(arrayOfPromises)) {
      throw Error("The provided object is not an Array");
    }
    return new Promise((resolve, reject) => {
      if (isEmptyArray(arrayOfPromises)) {
        resolve(arrayOfPromises);
      } else {
        for (const promise of arrayOfPromises) {
          Promise.resolve(promise)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
        }
      }
    });
  };

  // -------------------------------------------------
  // TEST
  // const p_arr = promiseRace(arrayOfPromises);
  // console.log(p_arr);
  // setTimeout(() => {
  //   console.log("The stack is empty");
  //   console.log(p_arr);
  // }, 1500);
  // -------------------------------------------------

  /**
   * Returns the last resolved/rejected promise
   * @param {*} arrayOfPromises
   */
  const promiseLast = (arrayOfPromises) => {
    if (!isArray(arrayOfPromises)) {
      throw Error("The provided object is not an Array");
    }
    return new Promise((resolve, reject) => {
      if (isEmptyArray(arrayOfPromises)) {
        resolve(arrayOfPromises);
      } else {
        const len = getArrayLength(arrayOfPromises);
        let error = null;
        let index = 0;

        for (const promise of arrayOfPromises) {
          Promise.resolve(promise)
            .then((res) => {
              index++;

              if (index === len) {
                if (error) {
                  reject(error);
                }
                resolve(res);
              }
            })
            .catch((err) => {
              index++;
              error = err;

              if (index === len) {
                reject(error);
              }
            });
        }
      }
    });
  };
  // -------------------------------------------------
  // TEST
  // const p_arr = promiseLast(arrayOfPromises);
  // console.log(p_arr);
  // setTimeout(() => {
  //   console.log("The stack is empty");
  //   console.log(p_arr);
  // }, 4000);
  // -------------------------------------------------

  /**
   * Returns only resolved promises, the errors are ignored
   * @param {*} arrayOfPromises
   */
  const promiseIngoreErrors = (arrayOfPromises) => {
    if (!isArray(arrayOfPromises)) {
      throw Error("The provided object is not an Array");
    }
    return new Promise((resolve, reject) => {
      if (isEmptyArray(arrayOfPromises)) {
        resolve(arrayOfPromises);
      } else {
        const len = getArrayLength(arrayOfPromises);
        let values = [];
        let index = 0;

        for (const promise of arrayOfPromises) {
          Promise.resolve(promise)
            .then((res) => {
              values.push(res);
              index++;

              if (index === len) {
                resolve(values);
              }
            })
            .catch((err) => {
              index++;

              if (index === len) {
                resolve(values);
              }
            });
        }
      }
    });
  };

  // -------------------------------------------------
  //TEST
  // const p_arr = promiseIngoreErrors(arrayOfPromises)
  // console.log(p_arr);
  // setTimeout(() => {
  //   console.log("The stack is empty");
  //    console.log(p_arr);
  // }, 4000);
  // -------------------------------------------------
})();
