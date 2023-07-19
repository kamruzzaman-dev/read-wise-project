// This function takes an object and an array of keys as input, and returns a new object
// that contains only the properties that are specified in the array of keys.
export const pick = <T extends object, K extends keyof T>(
  // The object to be picked from.
  obj: T,
  // The array of keys to pick.
  keys: K[]
): Partial<T> => {
  // Create a new object that will contain the results.
  const finalObj: Partial<T> = {};

  // Iterate over the keys array.
  for (const key of keys) {
    // Check if the object has the property with the specified key.
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      // If the object has the property, add it to the new object.
      finalObj[key] = obj[key];
    }
  }

  // Return the new object.
  return finalObj;
};
