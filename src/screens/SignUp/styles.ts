import {StyleSheet} from 'react-native';

const makeStyle = (theme: any) =>
  StyleSheet.create({
    // container: {flex: 1, paddingTop: 30},
    head: {height: 40, backgroundColor: '#f1f8ff'},
    // text: {margin: 6},
    container: {flex: 1, paddingTop: 30, backgroundColor: '#fff'},
    header: {height: 50, backgroundColor: '#537791'},
    text: {textAlign: 'center', fontWeight: '100'},
    dataWrapper: {marginTop: -1},
    row: {height: 40, backgroundColor: '#E7E6E1'},
  });

export default makeStyle;
