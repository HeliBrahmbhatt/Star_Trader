import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface TabScreenProps {
  title: string;
}

const TabScreen: React.FC<TabScreenProps> = ({title}) => (
  <View style={styles.container}>
    <Text style={styles.text}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default TabScreen;
