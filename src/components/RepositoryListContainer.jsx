import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import React from 'react';
import theme from '../theme';


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
  dropdownTrigger: {
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 5,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  dropdownTriggerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  optionText: {
    color: '#111827',
    fontWeight: 'bold',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  listHeaderContainer: {
    backgroundColor: '#e1e4e8',
    padding: 10,
    justifyContent: 'flex-start',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const sortOptions = [
  { label: 'Latest repositories', value: 'CREATED_AT-DESC' },
  { label: 'Oldest repositories', value: 'CREATED_AT-ASC' },
  { label: 'Highest rated repositories', value: 'RATING_AVERAGE-DESC' },
  { label: 'Lowest rated repositories', value: 'RATING_AVERAGE-ASC' },
];


export class RepositoryListContainer extends React.Component {
  state = {
    isSortMenuVisible: false,
  };

  openSortMenu = () => {
    this.setState({ isSortMenuVisible: true });
  };

  closeSortMenu = () => {
    this.setState({ isSortMenuVisible: false });
  };

  handleSortChange = (value) => {
    const { setOrderBy, setOrderDirection } = this.props;
    const [newOrderBy, newOrderDirection] = value.split('-');
    setOrderBy(newOrderBy);
    setOrderDirection(newOrderDirection);
    this.closeSortMenu();
  };

  renderHeader = () => {
    const { orderBy, orderDirection, searchKeyword, setSearchKeyword } = this.props;
    const { isSortMenuVisible } = this.state;
    const selectedSortValue = `${orderBy}-${orderDirection}`;
    const selectedSortOption = sortOptions.find(option => option.value === selectedSortValue);
    const selectedSortLabel = selectedSortOption ? selectedSortOption.label : 'Sort repositories';


    return (
      <View style={styles.listHeaderContainer}>
        <TextInput
          placeholder="Search repositories..."
          value={searchKeyword}
          onChangeText={setSearchKeyword}
          style={styles.searchInput}
        />
        <Pressable onPress={this.openSortMenu} style={styles.dropdownTrigger}>
          <Text style={styles.dropdownTriggerText}>{selectedSortLabel}</Text>
        </Pressable>

        <Modal
          visible={isSortMenuVisible}
          transparent
          animationType="fade"
          onRequestClose={this.closeSortMenu}
        >
          <Pressable style={styles.modalBackdrop} onPress={this.closeSortMenu}>
            <Pressable style={styles.modalCard} onPress={() => {}}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={styles.optionItem}
                  onPress={() => this.handleSortChange(option.value)}
                >
                  <Text style={styles.optionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </Pressable>
          </Pressable>
        </Modal>
      </View>

    );
  };

  

  render() {
    const { repositories, onEndReach, navigate, loading, error } = this.props;
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
              renderItem={({item}) => (
                <Pressable onPress={() => navigate(`/${item.id}`)}>
                  <RepositoryItem item={item}/>
                </Pressable>
              )}
              keyExtractor={item => item.id}
              ListHeaderComponent={this.renderHeader}
              onEndReached={onEndReach}
              onEndReachedThreshold={0.5}
              />
          </View>
      </View>
    );
  }
}
