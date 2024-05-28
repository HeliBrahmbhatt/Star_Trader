import {Dimensions, StyleSheet} from 'react-native';

const makeStyle = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      zIndex: 10,
    },
    text: {
      fontSize: 24,
      marginBottom: 20,
      color: 'white',
      fontWeight: 'bold',
    },

    image: {
      width: Dimensions.get('window').width / 7,
      height: Dimensions.get('window').width / 7,
    },
    slide: {
      flex: 5,
      // alignItems: 'center',
      // justifyContent: 'center',
    },

    onBoardingImage: {
      width: 153,
      height: 310,
      // marginVertical: 32,
    },
    onBoardingText: {
      color: 'rgba(255, 255, 255, 0.8)',
      textAlign: 'center',
    },
    title: {
      fontSize: 26,
      color: 'white',
      textAlign: 'center',
      fontWeight: '500',
      lineHeight: 33,
      textAlignVertical: 'center',
    },
    textDes: {
      fontSize: 16,
      color: 'white',
      textAlign: 'center',
      fontWeight: '400',
      lineHeight: 22,
      textAlignVertical: 'center',
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 16,
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 4,
    },
    buttonContainer: {
      flexDirection: 'row',
      marginHorizontal: 24,
      marginBottom: 16,
    },
    button: {
      flex: 1,
      paddingVertical: 20,
      marginHorizontal: 8,
      borderRadius: 24,
      backgroundColor: '#1cb278',
    },
    buttonText: {
      color: 'white',
      fontWeight: '600',
      textAlign: 'center',
    },
    box: {
      marginTop: Dimensions.get('window').height / 3,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      zIndex: 10,
    },
  });

export default makeStyle;
