import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = ({repositoryId}) => {

    const { data, error, loading} = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables: {repositoryId},
        skip: !repositoryId,
    });

    console.log('useRepository data:', data);
    
    if (error) {
        console.log('useRepository GraphQL Errors:', error.graphQLErrors);
        console.log('useRepository Network Error:', error.networkError);
        console.log('useRepository Message:', error.message);
    }

    return {
        repository: data?.repository,
        error,
        loading
    }
}

export default useRepository