import { useQuery } from "@apollo/client";
import { GET_REPOSITORY_REVIEWS } from "../graphql/queries";

const useRepositoryReviews = ({repositoryId}) => {

    const { data, error, loading} = useQuery(GET_REPOSITORY_REVIEWS, {
        fetchPolicy: 'cache-and-network',
        variables: {repositoryId},
        skip: !repositoryId,
    });

    console.log('useRepositoryReviews data:', data);
    
    if (error) {
        console.log('useRepositoryReviews GraphQL Errors:', error.graphQLErrors);
        console.log('useRepositoryReviews Network Error:', error.networkError);
        console.log('useRepositoryReviews Message:', error.message);
    }

    return {
        reviews: data?.repository?.reviews,
        error,
        loading
    }
}

export default useRepositoryReviews