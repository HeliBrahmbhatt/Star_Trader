import {StyleSheet} from 'react-native';

const makeGlobalStyleSheet = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.white,
    },
  });

export default makeGlobalStyleSheet;
