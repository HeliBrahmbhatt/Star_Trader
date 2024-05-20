import React, {useState} from 'react';
import {View, Button} from 'react-native';
import TextInput from '../../atoms/TextInput/TextInput';
import styles from './styles';

const Form: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = () => {
    let valid = true;

    if (name.trim() === '') {
      setNameError('Name is required');
      valid = false;
    } else {
      setNameError('');
    }

    if (email.trim() === '') {
      setEmailError('Email is required');
      valid = false;
    } else {
      setEmailError('');
    }

    if (valid) {
      // Handle form submission
      console.log({name, email});
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={text => {
          setName(text);
          if (nameError) {
            setNameError('');
          }
        }}
        errorMessage={nameError}
        onFocus={() => setNameError('')}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => {
          setEmail(text);
          if (emailError) {
            setEmailError('');
          }
        }}
        errorMessage={emailError}
        onFocus={() => setEmailError('')}
        keyboardType="email-address"
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default Form;
