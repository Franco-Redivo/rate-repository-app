import { Pressable, TextInput, View, StyleSheet } from "react-native";
import Text from "./Text";
import { useFormik } from "formik";
import theme from "../theme";
import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";
import { useNavigate } from "react-router-native";

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .min(3, 'username must have 3 characters or more')
        .required('username is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .min(0, 'min rating value is 0')
        .max(100, 'max rating value is 100')
        .integer()
        .required('Rating is required'),
    text: yup
        .string()
        .optional(),
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


const ReviewForm = () => {
    const navigate = useNavigate();
    const { createReview } = useCreateReview();

    const initialValues = {
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
    };

    const onSubmit = async (values) => {
        const reviewData = {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: Number(values.rating),
            text: values.text,
        };

        const { data } = await createReview({ variables: { review: reviewData } });
        const repositoryId = data?.createReview?.repositoryId;

        if (repositoryId) {
            navigate(`/${repositoryId}`);
        } else {
            console.error('Failed to create review');
        }

    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    const usernameInputStyles = [
        styles.input,
        formik.errors.ownerName && styles.errorInput
    ];

    const repositoryNameInputStyles = [
        styles.input,
        formik.errors.repositoryName && styles.errorInput,
    ]

    const ratingInputStyles = [
        styles.input,
        formik.errors.rating && styles.errorInput,
    ]

    const reviewInputStyles = [
        styles.input,
        formik.errors.review && styles.errorInput,
    ]

    return (
        <View style={styles.container}>
            <TextInput
                style={usernameInputStyles}
                placeholder="Repository owner username"
                value={formik.values.ownerName}
                onChangeText={formik.handleChange('ownerName')}
                onBlur={formik.handleBlur('ownerName')}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={styles.errorText}>{formik.errors.ownerName}</Text>
            )}

            <TextInput
                style={repositoryNameInputStyles}
                placeholder="Repository name"
                value={formik.values.repositoryName}
                onChangeText={formik.handleChange('repositoryName')}
                onBlur={formik.handleBlur('repositoryName')}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={styles.errorText}>{formik.errors.repositoryName}</Text>
            )}

            <TextInput
                style={ratingInputStyles}
                placeholder="Rating between 0 and 100"
                value={String(formik.values.rating)}
                onChangeText={formik.handleChange('rating')}
                onBlur={formik.handleBlur('rating')}
                keyboardType="numeric"
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={styles.errorText}>{formik.errors.rating}</Text>
            )}

            <TextInput
                style={reviewInputStyles}
                placeholder="Review (optional)"
                value={formik.values.text}
                onChangeText={formik.handleChange('text')}
                onBlur={formik.handleBlur('text')}
                multiline
            />
            {formik.touched.text && formik.errors.text && (
                <Text style={styles.errorText}>{formik.errors.text}</Text>
            )}

            <Pressable style={styles.button} onPress={formik.handleSubmit}>
                <Text style={styles.buttonText}>Create a review</Text>
            </Pressable>
        </View>
    );

}

export default ReviewForm;