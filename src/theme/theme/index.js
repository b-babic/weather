const colors = {
  black: '#000000',
  white: '#ffffff',
  transparent: 'transparent',
  gray: {
    200: '#EDF2F7',
    300: '#E2E8F0',
    500: '#A0AEC0',
    600: '#718096',
    700: '#4A5568',
    800: '#2D3748',
    900: '#1A202C',
  },
  yellow: {
    300: '#FAF089',
    400: '#F6E05E',
    500: '#ECC94B',
    600: '#D69E2E',
  },
  red: {
    400: '#FC8181',
    600: '#E53E3E',
  },
  green: {
    300: '#9AE6B4',
    400: '#68D391',
    500: '#48BB78',
    600: '#38A169',
  },
  teal: {
    300: '#81E6D9',
    400: '#4FD1C5',
    500: '#38B2AC',
    600: '#319795',
  },
  indigo: {
    300: '#A3BFFA',
    400: '#7F9CF5',
    500: '#667EEA',
    600: '#5A67D8',
    900: '#3C366B',
  },
};

const fontSizes = [12, 14, 16, 20, 24, 32, 36, 40, 44, 48];
const letterSpacings = [0, 1, 2];
const lineHeights = [12, 16, 32];
const space = [0, 4, 8, 16, 32, 64];

const theme = {
  light: {
    borders: [
      {borderColor: colors.gray['300'], borderWidth: 1},
      {borderColor: colors.gray['300'], borderWidth: 2},
      {borderColor: colors.gray['300'], borderWidth: 3},
    ],
    borderBottoms: [
      {borderBottomColor: colors.gray['300'], borderBottomWidth: 1},
    ],
    colors: {
      bg: colors.white,
      text: colors.gray['700'],
      inactiveText: colors.gray['300'],
      title: colors.gray['900'],
      subtitle: colors.gray['700'],
      border: colors.gray['300'],
      shadow: colors.gray['300'],
      activeIcon: colors.green['500'],
      inactiveIcon: colors.gray['300'],
      ...colors,
    },
    fontSizes,
    letterSpacings,
    lineHeights,
    space,
    shadows: [
      {
        elevation: 1,
        shadowColor: colors.gray['300'],
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.5,
        shadowRadius: 1,
      },
      {
        elevation: 3,
        shadowColor: colors.gray['300'],
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
      {
        elevation: 5,
        shadowColor: colors.gray['300'],
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
    ],
    fonts: {
      base: null,
    },
    borderRadiuses: [
      {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
      },
      {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
      },
      {
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
      },
    ],
  },
  dark: {
    borders: [
      {borderColor: colors.gray['500'], borderWidth: 1},
      {borderColor: colors.gray['500'], borderWidth: 2},
      {borderColor: colors.gray['500'], borderWidth: 3},
    ],
    borderBottoms: [{borderBottomColor: colors.white, borderBottomWidth: 1}],
    colors: {
      bg: colors.gray['800'],
      text: colors.gray['500'],
      inactiveText: colors.gray['700'],
      title: colors.gray['200'],
      subtitle: colors.gray['500'],
      border: colors.gray['500'],
      shadow: colors.gray['500'],
      activeIcon: colors.green['500'],
      inactiveIcon: colors.gray['700'],
      ...colors,
    },
    fontSizes,
    letterSpacings,
    lineHeights,
    space,
    shadows: [
      {
        elevation: 1,
        shadowColor: colors.white,
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.5,
        shadowRadius: 1,
      },
      {
        elevation: 3,
        shadowColor: colors.white,
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
      {
        elevation: 5,
        shadowColor: colors.white,
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
    ],
    fonts: {
      base: null,
    },
    borderRadiuses: [
      {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
      },
      {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
      },
      {
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
      },
    ],
  },
};

export default theme;
