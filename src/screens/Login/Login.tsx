import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import Form from '../../components/molecules/Form/Form';
import makeGlobalStyleSheet from '../../utils/globalStyle';
import {useTheme} from 'react-native-paper';

const Login = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const globalStyle = makeGlobalStyleSheet(theme);
  return (
    <SafeAreaView style={globalStyle.container}>
      <View>
        <Form />
      </View>
    </SafeAreaView>
  );
};

export default Login;
