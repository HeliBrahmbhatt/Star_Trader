import {StyleSheet} from 'react-native';

const makeStyle = (theme: any) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.colors.greenPrimary,
      paddingVertical: 15,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 40,
    },
    text: {
      color: theme.colors.background,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default makeStyle;
