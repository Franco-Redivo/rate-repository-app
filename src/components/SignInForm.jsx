import { Pressable, TextInput, View, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";


const SignInForm = ({ onSubmit }) => {
    const initialValues = {
        username: '',
        password: '',
    };

    const styles = StyleSheet.create({
        container: {
            padding: 16,
            borderStyle: 'solid',
            marginTop: '50%',
        },
        input: {
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
        },
        button: {
            backgroundColor: theme.colors.primary,
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
        },
        buttonText: {
            color: 'white',
            fontWeight: 'bold',
        },
    });

    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            <TextInput
             placeholder="Username"
             value={formik.values.username}
             onChangeText={formik.handleChange('username')}
             style={styles.input}
            />
            <TextInput
             placeholder="Password"
             value={formik.values.password}
             onChangeText={formik.handleChange('password')}
             secureTextEntry
             style={styles.input}
            />
            <Pressable onPress={formik.handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
        </View>
    );
};

export default SignInForm;

