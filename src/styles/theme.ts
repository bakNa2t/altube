interface ITheme {
  bgr: string;
  text: string;
  color_brand: string;
  color_grey_1: string;
  color_grey_2: string;
  color_grey_3: string;
  color_blue: string;
  color_auth: string;
  shadow_temp: string;
  color_white: string;
  color_black: string;
  color_divider: string;
  color_backdrop: string;
}

export const darkTheme: ITheme = {
  bgr: "#0f172a",
  text: "#e2e8f0",
  color_brand: "#9333ea",
  color_grey_1: "#9ca3af",
  color_grey_2: "#6b7280",
  color_grey_3: "#4b5563",
  color_blue: "#3b82f6",
  color_auth: "#525252",
  shadow_temp: "#0E0E0E",
  color_white: "#fafafa",
  color_black: "#0c0a09",
  color_divider: "#475569",
  color_backdrop: "#0a0a0a",
};

export const lightTheme: ITheme = {
  bgr: "#f1f5f9",
  text: "#020617",
  color_brand: "#9333ea",
  color_grey_1: "#9ca3af",
  color_grey_2: "#6b7280",
  color_grey_3: "#4b5563",
  color_blue: "#3b82f6",
  color_auth: "#525252",
  shadow_temp: "#0E0E0E",
  color_white: "#fafafa",
  color_black: "#0c0a09",
  color_divider: "#475569",
  color_backdrop: "#0a0a0a",
};

export const THEMES = {
  dark: darkTheme,
  light: lightTheme,
};

declare module "styled-components" {
  export interface DefaultTheme extends ITheme {
    additionalProperty: string;
  }
}
