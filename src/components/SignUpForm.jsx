import { Pressable, TextInput, View, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import useSignUp from "../hooks/useSignUp";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(5, 'username must have at least 5 characters')
        .max(30, 'username must have at most 30 characters')
        .required('username is required'),
    password: yup
        .string()
        .min(5, 'password must have at least 5 characters')
        .max(50, 'password must have at most 50 characters')
        .required('password is required'), 
    passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password'), null], 'passwords must match')
        .required('password confirmation is required'),       
});

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

const SignUpForm = () => {
    const navigate = useNavigate();
    const {signUp} = useSignUp();
    const [signIn] = useSignIn();

    const initialValues = {
        username: '',
        password: '',
        passwordConfirmation: '',
    }

    const onSubmit = async (values) => {
        const userData = {
            username: values.username,
            password: values.password,
        }

        const {data} = await signUp({ variables: { user: userData } });
        
        if (data?.createUser) {
            await signIn(userData);
            navigate('/');
        }else{
            console.log('Error creating user:', data);
        }
    }

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

    const passwordConfirmationInputStyles = [
        styles.input,
        formik.errors.passwordConfirmation && styles.errorInput,
    ]

    return (
        <View style={styles.container}>
            <TextInput
                style={usernameInputStyles}
                placeholder="Username"
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
                value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={styles.errorText}>{formik.errors.username}</Text>
            )}

            <TextInput
                style={passwordInputStyles}
                placeholder="Password"
                secureTextEntry
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={styles.errorText}>{formik.errors.password}</Text>
            )}

            <TextInput
                style={passwordConfirmationInputStyles}
                placeholder="Password Confirmation"
                secureTextEntry
                onChangeText={formik.handleChange('passwordConfirmation')}
                onBlur={formik.handleBlur('passwordConfirmation')}
                value={formik.values.passwordConfirmation}
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                <Text style={styles.errorText}>{formik.errors.passwordConfirmation}</Text>
            )}

            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
        </View>
    );
}

export default SignUpForm;