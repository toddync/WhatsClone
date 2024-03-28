import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    right: {
        width: "auto",
        maxWidth: "80%",
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom: 5,
        borderRadius: 13,
        backgroundColor: "red",

        notched: {
            width: "auto",
            maxWidth: "80%",
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 10,
            paddingLeft: 10,
            marginBottom: 5,
            borderRadius: 13,
            borderTopRightRadius: 0,
            backgroundColor: "red",
        }
    },
    left: {
        width: "auto",
        maxWidth: "80%",
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom: 5,
        borderRadius: 13,
        backgroundColor: "red",

        notched: {
            width: "auto",
            maxWidth: "80%",
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 10,
            paddingLeft: 10,
            marginBottom: 5,
            borderRadius: 13,
            borderTopLeftRadius: 0,
            backgroundColor: "red",
        }
    }
})

export default function Bubble({ children, position, notched }) {
    return (
        <View style={notched ? styles[position].notched : styles[position]}>
            {children}
        </View>
    )
}