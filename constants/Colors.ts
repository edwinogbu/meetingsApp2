const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export interface Theme {
  text: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  primary: string;
  secondary: string;
}

const lightTheme: Theme = {
  text: '#000',
  background: '#fff',
  tint: tintColorLight,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColorLight,
  primary: '#6c00b1', // Purple
  secondary: '#115f84', // Teal Blue
};

const darkTheme: Theme = {
  text: '#fff',
  background: '#000',
  tint: tintColorDark,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColorDark,
  primary: '#6c00b2', // Slightly different Purple for Dark mode
  secondary: '#115f84', // Teal Blue
};

const Colors = {
  ...lightTheme, // Default to Light Theme
  light: lightTheme,
  dark: darkTheme,
};

export default Colors;


// const tintColorLight = '#2f95dc';
// const tintColorDark = '#fff';

// export default {
//   light: {
//     text: '#000',
//     background: '#fff',
//     tint: tintColorLight,
//     tabIconDefault: '#ccc',
//     tabIconSelected: tintColorLight,
//   },
//   dark: {
//     text: '#fff',
//     background: '#000',
//     tint: tintColorDark,
//     tabIconDefault: '#ccc',
//     tabIconSelected: tintColorDark,
//   },
// };
