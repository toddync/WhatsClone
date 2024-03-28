import Container from "./Container";
import { Text, StyleSheet } from "react-native";
import { theme } from "../constants";

const styles = StyleSheet.create({
    count: {
        width: 25,
        height: 25,
        backgroundColor: theme.dark.colors.accent,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default function Counter({ count }) {
    return (
        <Container style={styles.count}>
            <Text style={{ color: "black" }}>{count}</Text>
        </Container>
    );
}
