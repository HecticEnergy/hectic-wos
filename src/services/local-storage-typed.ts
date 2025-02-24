export class LocalStorage<T> {
  private key: string;
  private defaultValue: T;

  constructor(key: string, defaultValue: T) {
    this.key = key;
    this.defaultValue = defaultValue;
  }

  load(): T | undefined {
    const storedValue = localStorage.getItem(this.key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
    return this.defaultValue;
  }

  save(value: T) {
    console.log("Saving to local storage", this.key, value);
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  remove() {
    localStorage.removeItem(this.key);
  }
}
