import React, {useState} from 'react';
import {
  View,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import TextInput from '../../atoms/Input/Input';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import Input from '../../atoms/Input/Input';
import {PrimaryButton} from '../../atoms/PrimaryButton/PrimaryButton';
import makeGlobalStyleSheet from '../../../utils/globalStyle';
import {useTheme} from 'react-native-paper';

const Form: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const globalStyle = makeGlobalStyleSheet(theme);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
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

  const validateName = name => {
    if (!name) {
      setNameError(t('validName'));
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = () => {
    const isValidMail = validateEmail(email, setEmailError);
    const isValidPass = validatePassword(password, setPasswordError, null);
    const isValidName = validateName(name, setNameError, null);

    if (isValidMail && isValidPass && isValidName) {
      Alert.alert('', 'Login done');
    }
  };

  const shouldShowButton = name || email || password;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        bounces={false}>
        <View style={styles.subContainer}>
          <Input
            value={name}
            placeholder={t('name')}
            onChangeText={text => {
              setName(text);
              if (nameError) {
                setNameError('');
              }
            }}
            fieldError={nameError}
            onFocus={() => setNameError('')}
          />
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
              setPassword(text);
              if (passwordError) {
                setPasswordError('');
              }
            }}
            showText={true}
            showTextOnPress={managePasswordVisibility}
            fieldError={passwordError}
            onFocus={() => setPasswordError('')}
          />
        </View>
      </ScrollView>
      {/* {shouldShowButton && ( */}
      <PrimaryButton
        title={t('Login')}
        onPress={handleSubmit}
        style={globalStyle.button}
      />
      {/* )} */}
    </KeyboardAvoidingView>
  );
};

export default Form;
