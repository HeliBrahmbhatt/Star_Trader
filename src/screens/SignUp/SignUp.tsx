import {View} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Table, Row, Rows} from 'react-native-table-component';
import makeStyle from './styles';
import {PrimaryButton} from '../../components/atoms/PrimaryButton/PrimaryButton';
import {DatabaseContext} from '../../services/Database/DatabaseContext';

const SignUp = () => {
  const theme = useTheme();
  const styles = makeStyle(theme);
  const navigation = useNavigation();
  const {data} = useContext(DatabaseContext);
  // console.log('data =====>', data);

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
