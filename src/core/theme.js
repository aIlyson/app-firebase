import { DefaultTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  dark: false,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FFFBFE",
    secondary: "#191B28",
    primaryContainer: "#F8F8F8",
    onPrimary: "#F1F1F1",
    btnPrimary: "#191B29",
    btnSecondary: "#F0F4F5",
    btnText: "#FFF",
    text: "#000",
    textSecondary: "#9FA6B2",
    surface: "#D8D8D8",
    success: "#3DC03C",
    pending: "#FFD700",
    error: "#B3261E",
    errorContainer: "#FFD8E4",
    onMore: "#4274EE",
    navColor: "#FCFCFC",
  },
};