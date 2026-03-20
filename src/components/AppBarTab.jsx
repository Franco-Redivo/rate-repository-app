import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignSelf: 'flex-start',
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