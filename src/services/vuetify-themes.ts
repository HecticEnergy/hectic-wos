import { useTheme, type ThemeInstance } from "vuetify";
import { LocalStorage } from "@/services/local-storage-typed";

type ThemeType = { theme: string };
export const localStorage = new LocalStorage<ThemeType>("theme", {
  theme: "dark",
});

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
    const storageTheme = localStorage.load();
    if (storageTheme?.theme !== undefined) {
      this.#themeId = storageTheme.theme as (typeof themeNames)[number];
      this.#theme.global.name.value = this.#themeId;
    }
  }

  rotateTheme = () => {
    const nextTheme =
      themeNames[(themeNames.indexOf(this.#themeId) + 1) % themeNames.length];
    this.#theme.global.name.value = nextTheme;
    this.#themeId = nextTheme;
    localStorage.save({ theme: nextTheme });
  };
}
