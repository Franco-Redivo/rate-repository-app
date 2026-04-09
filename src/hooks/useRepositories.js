import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ first, orderBy, orderDirection, searchKeyword }) => {
    const queryVariables = {
        first: first || 2,
        orderBy: orderBy || 'CREATED_AT',
        orderDirection: orderDirection || 'DESC',
        searchKeyword: searchKeyword || '',
    };

    const { data, error, fetchMore, loading, refetch } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: queryVariables,
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories?.pageInfo?.hasNextPage;

        if (!canFetchMore) {
            return 
        };

        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...queryVariables,
            },
        });
    }

    if (error) {
        console.log('useRepositories GraphQL Errors:', error.graphQLErrors);
        console.log('useRepositories Network Error:', error.networkError);
        console.log('useRepositories Message:', error.message);
    }

    return {
        repositories: data?.repositories,
        fetchMore: handleFetchMore,
        loading,
        error,
        refetch,
    };
};

export default useRepositories;