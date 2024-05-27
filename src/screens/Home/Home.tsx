import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import {DatabaseContext} from '@src/services/Database/DatabaseContext';

const Home = () => {
  const {data} = useContext(DatabaseContext);

  console.log('Home data =======>', data);

  return (
    <SafeAreaView>
      <View>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
