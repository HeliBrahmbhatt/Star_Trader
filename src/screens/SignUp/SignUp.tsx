import {View, Text, TouchableOpacity, Button} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Table, Row, Rows} from 'react-native-table-component';
import makeStyle from './styles';

const SignUp = () => {
  const theme = useTheme();
  const styles = makeStyle(theme);
  const navigation = useNavigation();

  const tableHead = [
    'Exchange',
    'Ticker',
    'Qty.',
    'Price',
    'Value',
    'Unrealized Gain/Loss',
  ];
  const tableData = [
    ['NFL', 'PMAH', '3', '300.10', '900.30', '200.33'],
    ['NFL', 'PMAH', '3', '300.10', '900.30', '200.33'],
    ['NFL', 'PMAH', '3', '300.10', '900.30', '200.33'],
    ['NFL', 'PMAH', '3', '300.10', '900.30', '200.33'],
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text>SignUp</Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />

      <View style={styles.container}>
        <Table borderStyle={{}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={tableData} textStyle={styles.text} />
        </Table>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
