import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import Constants from 'expo-constants';

const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: Constants.expoConfig.extra.APOLLO_URI,
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;