import useRepository from "../hooks/useRepository";
import useRepositoryReviews from "../hooks/useRepositoryReviews";
import { View, StyleSheet, FlatList } from "react-native";
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "./ReviewItem";
import { useParams } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
    statusContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
        reviewContainer: {
            backgroundColor: '#e1e4e8',
        }
});

const RepositoryView = () => {

    const {repositoryId} = useParams()
    console.log('RepositoryView repositoryId:', repositoryId);
    const {repository, error, loading} = useRepository({repositoryId});
    const {reviews} = useRepositoryReviews({repositoryId, first: 5});
    const reviewsNodes = reviews?.edges?.map(edge => edge.node) ?? [];

    if (loading) {
        return (
            <View style={styles.statusContainer}>
                <Text>Loading repository...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.statusContainer}>
                <Text>Error: Failed to load repository</Text>
                <Text fontSize="subheading">{error.message}</Text>
            </View>
        );
    }

    if (!repository) {
        return (
            <View style={styles.statusContainer}>
                <Text>Repository not found</Text>
            </View>
        );
    }

    return(
        <View style={styles.reviewContainer}>   
            <FlatList
                data={reviewsNodes}
                renderItem={({item}) => <ReviewItem review={item} />}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={() => <RepositoryItem item={repository} />}
                ItemSeparatorComponent={item => <View style={{height: 10}} />}
            />
        </View>
    );
}

export default RepositoryView