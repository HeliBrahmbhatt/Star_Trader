import {ScrollView, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Table, Row, Rows} from 'react-native-table-component';
import makeStyle from './styles';
import {DatabaseContext} from '../../services/Database/DatabaseContext';

const SignUp = () => {
  const theme = useTheme();
  const styles = makeStyle(theme);
  const navigation = useNavigation();
  const {data} = useContext(DatabaseContext);
  const [tableHead, setTableHead] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      // Extract table headers dynamically
      const headers = Object.keys(data[0]);
      setTableHead(headers);

      // Map the data array to create table rows
      const tableRows = data.map(item => headers.map(header => item[header]));
      setTableData(tableRows);
    }
  }, [data]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView horizontal>
        <View style={styles.container}>
          <ScrollView>
            <Table borderStyle={{borderWidth: 1}}>
              <Row
                data={tableHead}
                style={styles.head}
                textStyle={styles.text}
              />
              <Rows data={tableData} textStyle={styles.text} />
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
