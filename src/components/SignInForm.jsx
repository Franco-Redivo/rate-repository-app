import { Pressable, TextInput, View, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, 'username must have 3 characters or more')
        .required('username is required'),
    password: yup
        .string()
        .min(3,'password should have a minimum lenght of 3 characters')
        .required('password is required'),    
});


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
        errorText :{
            color: theme.colors.error,
            marginBottom: 12,
            marginTop: -5,
        },
        errorInput: {
            borderColor: theme.colors.error,
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
        validationSchema,
    });

    const usernameInputStyles = [
        styles.input,
        formik.errors.username && styles.errorInput
    ];

    const passwordInputStyles = [
        styles.input,
        formik.errors.password && styles.errorInput,
    ]

    return (
        <View style={styles.container}>
            <TextInput
             placeholder="Username"
             value={formik.values.username}
             onChangeText={formik.handleChange('username')}
             style={usernameInputStyles}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={styles.errorText}>{formik.errors.username}</Text>
            )}
            <TextInput
             placeholder="Password"
             value={formik.values.password}
             onChangeText={formik.handleChange('password')}
             secureTextEntry
             style={passwordInputStyles}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}
            <Pressable onPress={formik.handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
        </View>
    );
};

export default SignInForm;

