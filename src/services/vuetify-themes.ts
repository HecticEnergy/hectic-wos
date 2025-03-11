import { useTheme, type ThemeInstance } from "vuetify";
import { LocalStorage } from "@/services/local-storage-typed";

export const localStorage = new LocalStorage<{ theme: string }>("theme", {
  theme: "dark",
});

export const themeNames = [
  "light",
  "dark",
  "customDarkTheme",
  "customLightTheme",
] as const;

export type ThemeType = (typeof themeNames)[number];

export class ThemeSelect {
  #theme: ThemeInstance;
  #themeId: ThemeType;

  constructor() {
    this.#theme = useTheme();
    this.#themeId = this.#theme.name.value as ThemeType;
    let storageTheme = this.#themeId;
    try {
      storageTheme = localStorage.load()?.theme as ThemeType;
    } catch {
      localStorage.save({ theme: this.#themeId });
    }
    if (storageTheme !== undefined) {
      this.setTheme(storageTheme);
    }
  }

  rotateTheme = () => {
    const nextTheme =
      themeNames[(themeNames.indexOf(this.#themeId) + 1) % themeNames.length];
    this.setTheme(nextTheme);
  };

  getTheme = () => this.#themeId;

  setTheme = (theme: ThemeType) => {
    this.#theme.global.name.value = theme;
    this.#themeId = theme;
    localStorage.save({ theme });
  };
}
