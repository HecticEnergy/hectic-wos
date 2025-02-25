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
  tourConst: string,
  elementIndex: number = 0
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const selector = `[data-tour="${tourConst}"]`;
      const element = getHtmlElement(selector, elementIndex);
      element.click();
      element.dispatchEvent(new Event("input"));
    } catch (error) {
      reject(error);
    }
    window.setTimeout(() => {
      resolve();
    }, 100);
  });
};

export const setInputValue = async (
  tourConst: string,
  inputType: string,
  value: string
): Promise<void> => {
  return new Promise((resolve) => {
    const parentSelector = `[data-tour="${tourConst}"]`;
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
  tourConst: string,
  elementIndex: number = 0
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const selector = `[data-tour="${tourConst}"]`;
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

export type TourStep = {
  target: string;
  content: string;
  before: (() => Promise<void>) | undefined;
};

export const buildStep = (
  dataTourValue: string,
  content: string,
  func: (() => Promise<void>) | undefined = undefined,
  elementIndex: number = 0
): TourStep => {
  const before = !!func
    ? () =>
        func().then(() => {
          flashElement(dataTourValue, elementIndex);
        })
    : () => flashElement(dataTourValue, elementIndex);

  const target = `[data-tour="${dataTourValue}"]`;
  return { target, content, before };
};
