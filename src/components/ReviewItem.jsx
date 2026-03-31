import { View, StyleSheet } from 'react-native';
import Text from './Text';
import { format } from 'date-fns';
import theme from '../theme';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: 'white',
    },
    ratingContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderColor: theme.colors.primary,
        borderWidth: 2,
    },
    reviewContent: {
        flex: 1,
        gap: 5,
    },
    ratingText: {
        color: theme.colors.primary,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
    },
    ratingBackground: {
        backgroundColor: theme.colors.primary,
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reviewText: {
        marginTop: 5,
    },
    username: {
        fontWeight: theme.fontWeights.bold,
        fontSize: theme.fontSizes.subheading,
    },
    date: {
        color: theme.colors.textSecondary,
        marginBottom: 5,
    },
});

const ReviewItem = ({ review }) => {

    return (
        <View style={styles.container}>
            <View style={styles.ratingContainer}>
                <Text fontSize="subheading" style={styles.ratingText}>{review.rating}</Text>
            </View>
            <View style={styles.reviewContent}>
                <Text style={styles.username}>{review.user.username}</Text>
                <Text color="textSecondary">{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
                <Text>{review.text}</Text>
            </View>
        </View>
    )
}

export default ReviewItem;