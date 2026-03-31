import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import { useNavigate } from 'react-router-native';


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


const RepositoryListContainer = ({repositories, loading, error}) => {
    const repositoryNodes = repositories?.edges?.map(edge => edge.node) ?? [];
    const navigate = useNavigate();

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
            renderItem={({item}) => (
              <Pressable onPress={() => navigate(`/${item.id}`)}>
                <RepositoryItem item={item}/>
              </Pressable>
            )}
            keyExtractor={item => item.id}
            />
        </View>
    </View>
  );
}

export default RepositoryListContainer;