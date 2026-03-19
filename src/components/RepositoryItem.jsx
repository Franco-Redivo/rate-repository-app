import { View, StyleSheet } from 'react-native';
import Text from './Text'

const styles = StyleSheet.create({

});

const RepositoryItem = ({item}) => {
    return (
        <View>
            <Text>
                Full Name: {item.fullName}
                {'\n'}
                Description: {item.description}
                {'\n'}
                Language: {item.language}
                {'\n'}
                Stars: {item.stargazersCount}
                {'\n'}
                Forks: {item.forksCount}
                {'\n'}
                Reviews: {item.reviewCount}
                {'\n'}
                Rating: {item.ratingAverage}
            </Text>
        </View>
    );
};

export default RepositoryItem