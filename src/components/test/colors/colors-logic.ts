export interface ICustomColors {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    accent: string;
    error: string;
    warning: string;
    info: string;
    success: string;
    surfaceBright: string;
    surfaceVariant: string;
    primaryDarken1: string;
    secondaryDarken1: string;
    primaryLighten1: string;
    secondaryLighten1: string;
    onPrimary: string;
    onBackground: string;
    onError: string;
    onWarning: string;
    onInfo: string;
    onSuccess: string;
    onSurface: string;
    onSecondary: string;
    onSurfaceVariant: string;
  }
  
  export class CustomColors implements ICustomColors {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    accent: string;
    error: string;
    warning: string;
    info: string;
    success: string;
    surfaceBright: string;
    surfaceVariant: string;
    primaryDarken1: string;
    secondaryDarken1: string;
    primaryLighten1: string;
    secondaryLighten1: string;
    onPrimary: string;
    onBackground: string;
    onError: string;
    onWarning: string;
    onInfo: string;
    onSuccess: string;
    onSurface: string;
    onSecondary: string;
    onSurfaceVariant: string;
  
    constructor(theme: any) {
      this.background = theme.colors.background;
      this.surface = theme.colors.surface;
      this.primary = theme.colors.primary;
      this.secondary = theme.colors.secondary;
      this.accent = theme.colors.accent;
      this.error = theme.colors.error;
      this.warning = theme.colors.warning;
      this.info = theme.colors.info;
      this.success = theme.colors.success;
      this.surfaceBright = theme.colors['surface-bright'];
      this.surfaceVariant = theme.colors['surface-variant'];
      this.primaryDarken1 = theme.colors['primary-darken-1'];
      this.secondaryDarken1 = theme.colors['secondary-darken-1'];
      this.primaryLighten1 = theme.colors['primary-lighten-1'];
      this.secondaryLighten1 = theme.colors['secondary-lighten-1'];
      this.onPrimary = theme.colors.onPrimary;
      this.onBackground = theme.colors['on-background'];
      this.onError = theme.colors['on-error'];
      this.onWarning = theme.colors['on-warning'];
      this.onInfo = theme.colors['on-info'];
      this.onSuccess = theme.colors['on-success'];
      this.onSurface = theme.colors['on-surface'];
      this.onSecondary = theme.colors['on-secondary'];
      this.onSurfaceVariant = theme.colors['on-surface-variant'];
    }
  }
  
  