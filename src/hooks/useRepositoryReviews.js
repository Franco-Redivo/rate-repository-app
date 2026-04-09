import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_REVIEWS } from "../graphql/queries";

const useRepositoryReviews = ({repositoryId, first, after}) => {

    const { data, error, fetchMore, loading} = useQuery(GET_REPOSITORY_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables: {repositoryId, first, after},
        skip: !repositoryId,
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;

        if (!canFetchMore) {
            return 
        };

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                repositoryId,
                first,
            },
        });
    }

    console.log('useRepositoryReviews data:', data);
    
    if (error) {
        console.log('useRepositoryReviews GraphQL Errors:', error.graphQLErrors);
        console.log('useRepositoryReviews Network Error:', error.networkError);
        console.log('useRepositoryReviews Message:', error.message);
    }

    return {
        reviews: data?.repository?.reviews,
        fetchMore: handleFetchMore,
        error,
        loading
    }
}

export default useRepositoryReviews