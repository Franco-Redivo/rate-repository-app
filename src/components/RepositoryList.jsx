import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: '#e1e4e8',
    width: '100%',
    flex: 1,
  },
  flexContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
});



const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();

  const repositoryNodes = repositories?.edges?.map(edge => edge.node) ?? [];

  if (loading && repositoryNodes.length === 0) {
    return (
      <View style={styles.statusContainer}>
        <Text>Loading repositories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.statusContainer}>
        <Text>Error: Failed to load repositories</Text>
        <Text fontSize="subheading">{error.message}</Text>
      </View>
    );
  }

  if (repositoryNodes.length === 0) {
    return (
      <View style={styles.statusContainer}>
        <Text>No repositories found</Text>
      </View>
    );
  }

  return (
    <View style={styles.flexContainer}>
        <View style={styles.container}>
            <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({item}) => <RepositoryItem item={item}/>}
            keyExtractor={item => item.id}
            />
        </View>
    </View>
  );
};

export default RepositoryList;