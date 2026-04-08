import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryView from './RepositoryView';
import ReviewForm from './ReviewForm';
import SignUpForm from './SignUpForm';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
  flexContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
        <AppBar />
        <Routes>
            <Route path="/" element={<RepositoryList/>} />
            <Route path="/signin" element={<SignIn/>} />
            <Route path="/signup" element={<SignUpForm/>} />
            <Route path="/:repositoryId" element={<RepositoryView/>}/>
            <Route path="/review" element={<ReviewForm/>} />
            <Route path="/user-reviews" element={<UserReviews/>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </View>
  );
};

export default Main;