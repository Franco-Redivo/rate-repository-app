import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
    const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    });

    console.log('useRepositories - Full result:', { data, error, loading });
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