import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'react-native-paper';

import Form from '@src/components/molecules/Form/Form';
import makeGlobalStyleSheet from '@src/utils/globalStyle';

const Login = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const globalStyle = makeGlobalStyleSheet(theme);
  return (
    <SafeAreaView style={globalStyle.container}>
      <View style={{flex: 1}}>
        <Form />
      </View>
    </SafeAreaView>
  );
};

export default Login;
