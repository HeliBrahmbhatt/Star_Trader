import {I18nManager, Platform, StyleSheet} from 'react-native';

const makeStyle = (theme: any) =>
  StyleSheet.create({
    // container: {
    //   marginVertical: 8,
    // },
    // label: {
    //   marginBottom: 4,
    //   color: '#333',
    //   fontSize: 16,
    // },
    // input: {
    //   borderWidth: 1,
    //   borderColor: theme.colors.textInputBorder,
    //   borderRadius: 4,
    //   padding: 10,
    //   fontSize: 16,
    //   color: '#333',
    //   backgroundColor: theme.colors.textInputBackground,
    // },
    inputText: {
      fontSize: 16,
      color: theme.colors.text,
      width: '90%',
      justifyContent: 'center',
      alignSelf: 'center',
      padding: 8,
    },
    // error: {
    //   marginTop: 4,
    //   color: 'red',
    //   fontSize: 14,
    // },
    // showTextContainer: {
    //   paddingHorizontal: 8,
    // },
    // showText: {
    //   color: theme.colors.primary,
    //   fontSize: 16,
    // },
    // textInput: {
    //   flexDirection: 'row',
    //   alignItems: 'center',
    // },
    container: {
      // borderColor: theme.colors.gray,
      // borderWidth: 1,
      // borderRadius: 8,
      // paddingHorizontal: 20,
      // paddingVertical: Platform.OS === 'ios' ? 10 : 5,
      // marginTop: 20,
      borderWidth: 1,
      borderColor: theme.colors.textInputBorder,
      borderRadius: 4,
      padding: 10,
      fontSize: 16,
      color: '#333',
      backgroundColor: theme.colors.textInputBackground,
    },
    labelText: {
      fontSize: 15,
      color: theme.colors.descriptionText,
      alignSelf: 'flex-start',
    },

    image: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignSelf: 'center',
      resizeMode: 'contain',
      tintColor: theme.colors.text,
    },
    textInput: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    placeHolderStyle: {
      fontSize: 16,
    },
  });

export default makeStyle;
