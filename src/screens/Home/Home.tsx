import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {DatabaseContext} from '../../services/DatabaseContext';

const Home = () => {
  const {data, loading, error} = useContext(DatabaseContext);

  return (
    <SafeAreaView>
      <View>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
