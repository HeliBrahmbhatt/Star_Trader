import React, {useState} from 'react';
import {View, Button, Alert} from 'react-native';
import TextInput from '../../atoms/Input/Input';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import Input from '../../atoms/Input/Input';
import {PrimaryButton} from '../../atoms/PrimaryButton/PrimaryButton';

const Form: React.FC = () => {
  const {t} = useTranslation();

  const [password, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const emailRegex = /\S+@\S+\.\S+/;

  const managePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const validateEmail = (email, setError) => {
    if (!email) {
      setEmailError(t('emptyEmail'));
      return false;
    }

    if (!emailRegex.test(email)) {
      setEmailError(t('validEmail'));
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password, setError, type) => {
    if (!password) {
      setPasswordError(
        type === 'confirmPassword' ? t('emptyConformPass') : t('emptyPass'),
      );
      return false;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(t('strongPass'));
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = () => {
    const isValidMail = validateEmail(email, setEmailError);
    const isValidPass = validatePassword(password, setPasswordError, null);

    if (isValidMail && isValidPass) {
      Alert.alert('', 'Login done');
    }
  };

  return (
    <View style={styles.container}>
      <Input
        value={email}
        placeholder={t('emailPlaceHolder')}
        onChangeText={text => {
          setEmail(text);
          if (emailError) {
            setEmailError('');
          }
        }}
        fieldError={emailError}
        onFocus={() => setEmailError('')}
        keyboardType="email-address"
      />
      <Input
        value={password}
        placeholder={t('passwordPlaceHolder')}
        secureTextEntry={secureTextEntry}
        onChangeText={text => {
          setName(text);
          if (passwordError) {
            setPasswordError('');
          }
        }}
        showText={true}
        showTextOnPress={managePasswordVisibility}
        fieldError={passwordError}
        onFocus={() => setPasswordError('')}
      />
      {/* <Button title="Submit" onPress={handleSubmit} /> */}
      <PrimaryButton title={t('Login')} onPress={handleSubmit} />
    </View>
  );
};

export default Form;
