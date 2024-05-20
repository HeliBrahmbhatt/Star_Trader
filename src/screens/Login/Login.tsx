import {View, Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import Form from '../../components/molecules/Form/Form';

const Login = () => {
  const {t} = useTranslation();
  return (
    <SafeAreaView>
      <View>
        <Form />
      </View>
    </SafeAreaView>
  );
};

export default Login;
