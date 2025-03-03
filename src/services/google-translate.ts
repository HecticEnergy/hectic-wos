export default {
  loadGoogleTranslateScript: () => {
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    // script.async = true;
    document.body.appendChild(script);
  },

  googleTranslateElementInit: () => {
    new google.translate.TranslateElement(
      { pageLanguage: "en" },
      "google_translate_element"
    );
  },
};
