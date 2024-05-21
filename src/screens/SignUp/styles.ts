import {StyleSheet} from 'react-native';

const makeStyle = (theme: any) =>
  StyleSheet.create({
    container: {flex: 1, paddingTop: 30},
    head: {height: 40, backgroundColor: '#f1f8ff'},
    text: {margin: 6},
  });

export default makeStyle;
