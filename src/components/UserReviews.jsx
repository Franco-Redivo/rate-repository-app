import ReviewItem from "./ReviewItem";
import { GET_USER } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { FlatList, View, StyleSheet,Pressable, Alert } from "react-native";
import { useNavigate } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: '#e1e4e8',
        gap: 10,
    },
    list: {
        gap: 10,
        
    },
    btnsContainer: {
        flexDirection: 'row',
        gap: 10,
        backgroundColor: 'white',
        paddingTop: 10,
        justifyContent: 'center',
        paddingBottom: 20,
    },
    viewBtn: {
        backgroundColor: '#0366d6',
        padding: 10,
        borderRadius: 5,
    },
    deleteBtn: {
        backgroundColor: '#d73a4a',
        padding: 10,
        borderRadius: 5,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

const UserReviews = () => {
    const { data, error, loading } = useQuery(GET_USER, {
        variables: { includeReviews: true },
    });

    const [deleteReview] = useMutation(DELETE_REVIEW, {
        refetchQueries: [{ query: GET_USER, variables: { includeReviews: true } }],
    });

    const navigate = useNavigate();

    if (error) {
        console.log('UserReviews GraphQL Errors:', error.graphQLErrors);
        console.log('UserReviews Network Error:', error.networkError);
        console.log('UserReviews Message:', error.message);
    }

    const reviews = data?.me?.reviews?.edges || [];

    return (
        <View style={styles.container}>
            <FlatList
                data={reviews}
                keyExtractor={({ node }) => node.id}
                renderItem={({ item }) => <View>
                        <ReviewItem review={item.node} />
                        <View style={styles.btnsContainer}>
                            <Pressable style={styles.viewBtn} onPress={() => navigate(`/${item.node.repositoryId}`)}>
                                <Text style={styles.btnText}>View Repository</Text>
                            </Pressable>
                            <Pressable style={styles.deleteBtn} onPress={() => Alert.alert(
                                'Delete Review',
                                'Are you sure you want to delete this review?',
                                [
                                    { text: 'Cancel', style: 'cancel' },
                                    { text: 'OK', onPress: () => deleteReview({ variables: { deleteReviewId: item.node.id } }) },
                                ],
                                { cancelable: true }
                            )}>
                                <Text style={styles.btnText}>Delete Review</Text>
                            </Pressable>
                        </View>
                    </View>}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

export default UserReviews;