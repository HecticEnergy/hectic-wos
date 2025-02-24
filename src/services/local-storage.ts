function load<T>(key: string, defaultValue?: T): T | undefined {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    return JSON.parse(storedValue);
  }
  return defaultValue;
}

function save<T>(key: string, value: T) {
  console.log("Saving to local storage", key, value);
  localStorage.setItem(key, JSON.stringify(value));
}

function remove(key: string) {
  localStorage.removeItem(key);
}

export { load, save, remove };
