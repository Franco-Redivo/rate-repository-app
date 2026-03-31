import { View, StyleSheet } from 'react-native';
import SignInForm from './SignInForm';

const styles = StyleSheet.create({
    container: {
        padding: 16,
        height: "100%",
    },
});

const SignInContainer = ({ onSubmit }) => {
    return(
        <View style={styles.container}>
            <SignInForm onSubmit={onSubmit}/>
        </View>
    )
};

export default SignInContainer;