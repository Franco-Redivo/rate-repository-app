import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
    const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: {
            orderBy: orderBy || 'CREATED_AT',
            orderDirection: orderDirection || 'DESC',
            searchKeyword: searchKeyword || '',
        },
    });

    if (error) {
        console.log('useRepositories GraphQL Errors:', error.graphQLErrors);
        console.log('useRepositories Network Error:', error.networkError);
        console.log('useRepositories Message:', error.message);
    }

    return {
        repositories: data?.repositories,
        loading,
        error,
        refetch,
    };
};

export default useRepositories;