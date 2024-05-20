import React from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  I18nManager,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageSourcePropType,
} from 'react-native';
import {HelperText, useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

import makeStyle from './styles';

interface InputProps extends TextInputProps {
  value: string;
  onChange: (text: string) => void;
  fieldError?: string;
  label?: string;
  onfocus?: () => void;
  secureTextEntry?: boolean;
  iconPath?: string;
  showText?: boolean;
  leftIcon?: ImageSourcePropType;
  placeHolder?: string;
  inputStyle?: StyleProp<TextStyle>;
  inpuContainerStyle?: StyleProp<ViewStyle>;
  showTextOnPress?: () => void;
  editable?: boolean;
  onBlur?: () => void;
  setPadding?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  fieldError,
  label,
  onfocus,
  secureTextEntry,
  iconPath,
  showText,
  leftIcon,
  placeHolder,
  inputStyle,
  inpuContainerStyle,
  showTextOnPress,
  editable = true,
  onBlur,
  setPadding,
  ...rest
}) => {
  const theme = useTheme();
  const styles = makeStyle(theme, setPadding);
  const {t} = useTranslation();

  return (
    <>
      <View style={[styles.container, inpuContainerStyle]}>
        <View style={styles.textInput}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={placeHolder}
            style={[styles.inputText, inputStyle]}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
            placeholderTextColor={theme.colors.gray}
            editable={editable}
            onBlur={onBlur}
            textAlign={I18nManager.isRTL ? 'right' : 'left'}
            {...rest}
          />
          {showText && (
            <TouchableOpacity
              onPress={() => {
                showTextOnPress();
              }}>
              <Text style={{color: theme.colors.greenPrimary}}>
                {t('show')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <HelperText type="error">{fieldError}</HelperText>
    </>
  );
};

export default Input;
