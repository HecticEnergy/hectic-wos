import { useTheme, type ThemeInstance } from "vuetify";

export const themeNames = [
  "light",
  "dark",
  "customDarkTheme",
  "customLightTheme",
] as const;

export class ThemeSelect {
  #theme: ThemeInstance;
  #themeId: (typeof themeNames)[number];

  constructor() {
    this.#theme = useTheme();
    this.#themeId = this.#theme.name.value as (typeof themeNames)[number];
  }

  rotateTheme = () => {
    const nextTheme =
      themeNames[(themeNames.indexOf(this.#themeId) + 1) % themeNames.length];
    localStorage.theme = this.#theme.global.name.value = nextTheme;
    this.#themeId = nextTheme;
  };
}
