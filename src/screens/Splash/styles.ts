import {StyleSheet} from 'react-native';

const makeStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      marginBottom: 20,
      color: 'white',
      fontWeight: 'bold',
    },
    image: {
      width: 130,
      height: 130,
    },
  });

export default makeStyle;
