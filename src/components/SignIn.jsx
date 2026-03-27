import Text from './Text';
import { View, StyleSheet } from 'react-native';
import SignInForm from './SignInForm';
import useSignIn from '../hooks/useSignIn';
import AuthStorage from '../utils/authStorage';

const SignIn = () => {
    const [signIn] = useSignIn();
    const authStorage = new AuthStorage();

    const styles = StyleSheet.create({
        container: {
            padding: 16,
            height: "100%",
        },
    });

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            const data = await signIn({ username, password });
            await authStorage.setAccessToken(data);
            console.log('Sign-in successful, access token :', await authStorage.getAccessToken());

        } catch (error) {
            console.error('Sign-in failed:', error);
        }
    };
    return (
        <View style={styles.container}>
            <SignInForm onSubmit={onSubmit} />
        </View>
    );
};

export default SignIn;