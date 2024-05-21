import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // container: {
  //   padding: 16,
  //   backgroundColor: 'red',
  //   flex: 1,
  // },
  // subContainer: {flex: 1},
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  subContainer: {
    padding: 20,
  },
  submitButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignSelf: 'center',
  },
});
