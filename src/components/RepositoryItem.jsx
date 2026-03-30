import { View, StyleSheet, Image } from 'react-native';
import Text from './Text'
import theme from '../theme';

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        marginBottom: 5,
        width: '100%',

    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    tag: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    tagText: {
        color: 'white',
    },
    description: {
        flexShrink: 1,
    },
    mainInfoContainer: {
        flexDirection:'row',
        padding: 15,
        gap: 15,    
    },
    infoContainer: {
        gap: 7,
        paddingTop: 5,
        
        flex: 1,
        flexShrink: 1,
        minWidth: 0,
    },
    mainStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 45,
        paddingBottom: 15,
    },
    statContainer: {
        alignItems: 'center',
        gap: 5,
    }

});



const RepositoryItem = ({item}) => {
    const formatCount = (count) => {
        if(count < 1000) return count;
        if(count < 1000000) return (count / 1000).toFixed(1) + 'k';
        return (count / 1000000).toFixed(1) + 'M';
    };
    return (
        <View testID="repositoryItem" style={styles.mainContainer}>
            <View style={styles.mainInfoContainer}>
                <Image
                    style={styles.avatar}
                    source={{uri: item.ownerAvatarUrl}} 
                />
                <View style={styles.infoContainer}>
                    <Text fontSize={'subheading'} fontWeight={'bold'}>{item.fullName}</Text>
                    <Text style={styles.description} color={'textSecondary'}>{item.description}</Text>
                    <View style={styles.tag}>
                        <Text style={styles.tagText} fontWeight={'bold'}>{item.language}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.mainStatsContainer}>
                <View style={styles.statContainer}>
                    <Text fontWeight={'bold'}>{formatCount(item.stargazersCount)}</Text>
                    <Text color={'textSecondary'}>Stars</Text>
                </View>
                <View style={styles.statContainer}>
                    <Text fontWeight={'bold'}>{formatCount(item.forksCount)}</Text>
                    <Text color={'textSecondary'}>Forks</Text>
                </View>
                <View style={styles.statContainer}>
                    <Text fontWeight={'bold'}>{formatCount(item.reviewCount)}</Text>
                    <Text color={'textSecondary'}>Reviews</Text>
                </View>
                <View style={styles.statContainer}>
                    <Text fontWeight={'bold'}>{item.ratingAverage}</Text>
                    <Text color={'textSecondary'}>Rating</Text>
                </View>
            </View>
        </View>
    );
};

export default RepositoryItem