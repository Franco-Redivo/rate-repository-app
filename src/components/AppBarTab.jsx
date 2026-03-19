import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.primary,
  },
  text:{
    color: 'white',
  }
});

const AppBarTab = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default AppBarTab;