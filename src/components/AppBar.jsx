import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useNavigate } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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
  const apolloClient = useApolloClient();
  const { data } = useQuery(GET_USER);
  const authStorage = useAuthStorage();

  return(
    <View style={styles.container}>
        <ScrollView style={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
            <AppBarTab text="Repositories" onPress={() => navigate('/')} />
              {data?.me?.username ? (
                <>
                  <AppBarTab text="Create a Review" onPress={() => navigate('/review')} />
                  <AppBarTab text="My Reviews" onPress={() => navigate('/user-reviews')} />
                  <AppBarTab text="Sign Out" onPress={async () => {
                    await authStorage.removeAccessToken();
                    await apolloClient.resetStore();
                    navigate('/signin');
                  }} />
                </>
              ) : (
                <>
                  <AppBarTab text="Sign Up" onPress={() => navigate('/signup')} />
                  <AppBarTab text="Sign In" onPress={() => navigate('/signin')} />
                </>
              )}
        </ScrollView>
    </View>
  );
};

export default AppBar;