const getHtmlElement = (
  selector: string,
  elementIndex: number = 0
): HTMLElement => {
  const elements = document.querySelectorAll(selector);
  let element: Element | null = null;
  if (elementIndex >= 0) {
    element = elements[elementIndex];
  } else {
    element = elements[elements.length + elementIndex];
  }

  if (!(element && element instanceof HTMLElement)) {
    throw new Error(`Element not found: ${selector}`);
  }

  return element;
};

export const click = async (
  selector: string,
  elementIndex: number = 0
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const element = getHtmlElement(selector, elementIndex);
      element.click();
    } catch (error) {
      reject(error);
    }
    window.setTimeout(() => {
      resolve();
    }, 100);
  });
};

export const setInputValue = async (
    parentSelector: string,
    inputType: string,
  value: string
): Promise<void> => {
  return new Promise((resolve) => {
    const parent = document.querySelector(parentSelector);
    const element = parent?.querySelector(`:scope * ${inputType}`);
    if (element && element instanceof HTMLTextAreaElement) {
      element.value = value;
      element.dispatchEvent(new Event("input"));
    }
    resolve();
  });
};

export const flashElement = async (
  selector: string,
  elementIndex: number = 0
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const element = getHtmlElement(selector, elementIndex);
      element.classList.add("tour-flash");
      const interval = window.setInterval(() => {
        clearInterval(interval);
        element.classList.remove("tour-flash");
      }, 3000);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
