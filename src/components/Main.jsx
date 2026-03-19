import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
  flexContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.flexContainer}>
        <Text color={'primary'}>Rate Repository Application!</Text>
        <RepositoryList/>
      </View>
    </View>
  );
};

export default Main;