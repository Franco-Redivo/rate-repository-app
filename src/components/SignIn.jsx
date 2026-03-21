import Text from './Text';
import { View, StyleSheet } from 'react-native';
import SignInForm from './SignInForm';

const SignIn = () => {

    const styles = StyleSheet.create({
        container: {
            padding: 16,
            height: "100%",
        },
    });

    const onSubmit = (values) => {
        console.log(values);
    };
    return (
        <View style={styles.container}>
            <SignInForm onSubmit={onSubmit} />
        </View>
    );
};

export default SignIn;