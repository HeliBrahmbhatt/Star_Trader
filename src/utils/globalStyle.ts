import {StyleSheet} from 'react-native';

const makeGlobalStyleSheet = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
    button: {
      backgroundColor: theme.colors.greenPrimary,
      paddingVertical: 15,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 40,
    },
  });

export default makeGlobalStyleSheet;
