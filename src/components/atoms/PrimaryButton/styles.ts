import {StyleSheet} from 'react-native';

const makeStyle = (theme: any) =>
  StyleSheet.create({
    text: {
      color: theme.colors.background,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default makeStyle;
