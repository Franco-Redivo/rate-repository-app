import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 90,
  },
  scrollView: {
    flexDirection: 'row',
    gap: 10,
  },
});

const AppBar = () => {
  const navigate = useNavigate();

  return(
    <View style={styles.container}>
        <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
            <AppBarTab text="Repositories" onPress={() => navigate('/')} />
            <AppBarTab text="Sign In" onPress={() => navigate('/signin')} />
        </ScrollView>
    </View>
  );
};

export default AppBar;