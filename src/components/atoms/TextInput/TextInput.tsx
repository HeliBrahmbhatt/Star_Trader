import React from 'react';
import {
  TextInput as RNTextInput,
  TextInputProps,
  View,
  Text,
} from 'react-native';
import styles from './styles';

interface Props extends TextInputProps {
  label?: string;
  errorMessage?: string;
  onFocus?: () => void;
}

const TextInput: React.FC<Props> = ({
  label,
  errorMessage,
  onFocus,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <RNTextInput style={styles.input} onFocus={onFocus} {...rest} />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default TextInput;
