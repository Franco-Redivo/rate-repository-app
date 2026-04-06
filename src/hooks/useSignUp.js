import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
    const [signUp, {data, error, loading}] = useMutation(CREATE_USER);

    if (error) {
        console.log('useSignUp GraphQL Errors:', error.graphQLErrors);
        console.log('useSignUp Network Error:', error.networkError);
        console.log('useSignUp Message:', error.message);
    }

    return {
        signUp,
        user: data?.createUser,
        error,
        loading
    }
}

export default useSignUp;