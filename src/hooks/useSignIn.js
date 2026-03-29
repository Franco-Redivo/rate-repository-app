import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(AUTHENTICATE);

    const signIn = async ( {username, password} ) => {
        try {
            const { data } = await mutate({ variables: { credentials: { username, password } } });
            await authStorage.setAccessToken(data.authenticate.accessToken);
            console.log('Sign-in successful, access token :', await authStorage.getAccessToken());
            apolloClient.resetStore();
            return data.authenticate.accessToken;
        } catch (error) {
            console.error("Sign-in error:", error);
            throw error;
        }
    }

    return [signIn, result];
}

export default useSignIn;