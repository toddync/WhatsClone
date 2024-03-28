import { View, Text, StyleSheet, Platform, TextInput } from "react-native";
import { useContext } from "react";
import MaskInput from "react-native-mask-input";
import GlobalContext from "../contexts/global";

const Input = (props) => {
    const { dimensions } = useContext(GlobalContext.context);

    const styles = StyleSheet.create({
        input: {
            width: "90%",
            height: dimensions.height / 15,
            minHeight: 50,
            paddingLeft: Platform.OS != "web" ? 15 : 10,
            paddingRight: Platform.OS != "web" ? 15 : 10,
            borderRadius: 15,
            marginBottom: 20,
            elevation: 4,
            shadowColor: "gray",
            shadowRadius: 10,
            shadowOffset: {
                width: 3,
                height: 3,
            },
        },
        label: {
            width: "90%",
            marginBottom: 10,
            paddingStart: 8,
        },
    });

    return (
        <>
            <View style={styles.label}>
                <Text>{props.name || null}</Text>
            </View>
            <MaskInput
                {...{ ...props, name: null }}
                style={styles.input}
            />
        </>
    );
};

export default Input;
