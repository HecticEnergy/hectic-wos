export const selectHtmlContent = (eleId: string) => {
  const output = document.getElementById(eleId);
  if (!output) return;
  const range = document.createRange();
  range.selectNode(output);
  window.getSelection()?.removeAllRanges();
  window.getSelection()?.addRange(range);
};

export const copyHtmlContent = (eleId: string) => {
  const copyText = document.getElementById(eleId);
  if (!!copyText?.innerText) navigator.clipboard.writeText(copyText?.innerText);
};

export const openInNewTab = (url: string) => {
  const win = window.open(url, "_blank");
  win?.focus();
};
