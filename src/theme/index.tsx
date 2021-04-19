import React from 'react';

import {
  ThemeProvider as ReThemeProvider,
  TextProps,
  BoxProps,
} from '@shopify/restyle';

import { Platform, useColorScheme } from 'react-native';

type BaseThemeType = typeof BaseTheme & {
  textVariants: { [key: string]: TextProps<typeof BaseTheme> };
  buttonVariants: { [key: string]: BoxProps<typeof BaseTheme> };
};

export const palette = {
  white: '#FFFFFF',
  cyan: '#2CB9B0',
  lightCyan: '#E7F9F7',
  darkBlue: '#0C0D34',
  orange: '#FE5E33',
  yellow: '#FFC641',
  pink: '#FF87A2',
  darkPink: '#FF0058',
  violet: '#442CB9',
  lightBlue: '#BFEAF5',
  grey: '#F4F0EF',
  darkGrey: '#808080',
  black: '#000000',
  transparent: '#FFFFFF00',
};

const createTheme = <T extends BaseThemeType>(themeObject: T): T => themeObject;

const BaseTheme = {
  colors: {
    textPrimary: palette.black,
    textSecondary: palette.darkGrey,
    primaryBackground: palette.white,
    buttonBackgroundPrimary: palette.cyan,
    buttonTextPrimary: palette.white,
    buttonBackgroundTransparent: palette.transparent,
    grey: palette.grey,
    darkGrey: palette.darkGrey,
    white: palette.white,
    black: palette.black,
    error: palette.darkPink,
    body: 'rgba(12, 13, 52, 0.7)',
  },
  spacing: {
    es: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 48,
  },
  breakpoints: {},
};

export const theme = createTheme({
  ...BaseTheme,
  buttonVariants: {
    defaults: {
      height: 48,
      fontSize: 16,
      backgroundColor: 'buttonBackgroundPrimary',
    },
    primary: {
      backgroundColor: 'buttonBackgroundPrimary',
    },
    imageButton: {
      backgroundColor: 'buttonBackgroundTransparent',
    },
    containerButton: {
      height: '100%',
      backgroundColor: 'buttonBackgroundTransparent',
      shadowOpacity: 0.5,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 1,
      elevation: 1,
    },
  },
  textVariants: {
    defaults: {
      color: 'textPrimary',
    },
    header: {
      fontWeight: 'bold',
      fontSize: 28,
      lineHeight: 42.5,
      color: 'textPrimary',
    },
    subheader: {
      fontWeight: '600',
      fontSize: 18,
      lineHeight: 24,
    },
    body: {
      fontSize: 18,
      lineHeight: 18,
      color: 'black',
    },
    /** Text that will be shown on the button */
    button_primary: {
      color: 'white',
      fontSize: 16,
      lineHeight: 16,
    },
    label: {
      fontSize: 12,
      lineHeight: 18,
      color: 'body',
      paddingVertical: 'es',
    },
  },
  inputVariants: {
    defaults: {},
    textArea: {},
    searchbox: {},
  },
});

export type Theme = typeof theme;

const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    textPrimary: palette.white,
    primaryBackground: palette.black,
    body: palette.grey,
  },
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeToApply = useColorScheme() === 'dark' ? darkTheme : theme;
  return <ReThemeProvider theme={themeToApply}>{children}</ReThemeProvider>;
};
