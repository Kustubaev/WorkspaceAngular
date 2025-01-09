export function getAllKeys(obj: any): (string | (string | unknown)[])[] {
  function recursiveKeys(
    currentObj: Record<string, unknown>
  ): (string | (string | unknown)[])[] {
    const keys: (string | (string | unknown)[])[] = [];

    for (let key in currentObj) {
      if (currentObj.hasOwnProperty(key)) {
        if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
          keys.push([
            key,
            ...recursiveKeys(currentObj[key] as Record<string, unknown>),
          ]);
        } else {
          keys.push(key);
        }
      }
    }

    return keys;
  }

  return recursiveKeys(obj);
}
