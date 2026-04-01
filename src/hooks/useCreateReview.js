import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
    const [createReview, { data, error, loading }] = useMutation(CREATE_REVIEW);

    if (error) {
        console.log('useCreateReview GraphQL Errors:', error.graphQLErrors);
        console.log('useCreateReview Network Error:', error.networkError);
        console.log('useCreateReview Message:', error.message);
    }

    return {
        createReview,
        review: data?.createReview,
        error,
        loading
    }
}

export default useCreateReview