import Text from './Text';
import { View, StyleSheet } from 'react-native';
import SignInForm from './SignInForm';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const SignIn = () => {
    const [signIn] = useSignIn();
    const navigate = useNavigate();

    const styles = StyleSheet.create({
        container: {
            padding: 16,
            height: "100%",
        },
    });

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await signIn({ username, password });
            navigate('/');

        } catch (error) {
            console.error('Sign-in failed:', error);
        }
    };
    return (
        <View style={styles.container}>
            <SignInForm onSubmit={onSubmit}/>
        </View>
    );
};

export default SignIn;