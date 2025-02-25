export const click = async (selector: string): Promise<void> => {
  return new Promise((resolve) => {
    const element = document.querySelector(selector);
    if (element && element instanceof HTMLElement) {
      element.click();
    }

    window.setTimeout(() => {
      resolve();
    }, 100);
  });
};

export const setTextAreaValue = async (
  parentSelector: string,
  value: string
): Promise<void> => {
  return new Promise((resolve) => {
    const parent = document.querySelector(parentSelector);
    const element = parent?.querySelector(":scope * textarea");
    if (element && element instanceof HTMLTextAreaElement) {
      element.value = value;
      element.dispatchEvent(new Event('input'));
    }
    resolve();
  });
};

export const flashElement = async (selector: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (!(element && element instanceof HTMLElement)) {
      return reject(new Error(`Element not found: ${selector}`));
    }

    element.classList.add("tour-flash");
    resolve();

    const interval = window.setInterval(() => {
      clearInterval(interval);
      element.classList.remove("tour-flash");
    }, 3000);
  });
};
