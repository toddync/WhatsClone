import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from "react-native";
import { useCallback, useContext, useState } from "react";
import GlobalContext from "../../contexts/global";
import Input from "../../components/Input";
import { router } from "expo-router";

const Login = () => {
    const { dimensions, socket } = useContext(GlobalContext.context);
    const styles = StyleSheet.create({
        center: {
            justifyContent: "center",
            alignItems: "center",
        },
        container: {
            height: "100%",
            width: "auto",
            backgroundColor: "whitesmoke",
        },
        form: {
            width: "80%",
            maxWidth: "500px",
            height: dimensions.height / 1.5,
            minHeight: 400,
            borderRadius: 30,
            backgroundColor: "white",
            elevation: 6,
            shadowColor: "gray",
            shadowRadius: 10,
            shadowOffset: {
                width: 3,
                height: 3,
            },
        },
        button: {
            width: "80%",
            height: dimensions.height / 15,
            borderRadius: 15,
            backgroundColor: "lightblue",
            marginTop: 25,
        },
        sign: {
            marginTop: 5,
        },
        text: {
            fontSize: Platform.OS != "web" ? 13 : "0.9rem",
        },
        blue: {
            color: "darkcyan",
            borderBottomWidth: 1,
            borderBottomColor: "darkcyan",
        },
        error: {
            color: "red",
            fontSize: Platform.OS != "web" ? 13 : "0.9rem",
        },
        success: {
            color: "darkcyan",
            fontSize: Platform.OS != "web" ? 15 : "1rem",
        },
    });

    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const passwordSetter = useCallback((e) => {
        if (
            !e.nativeEvent.text.match(/[^A-Za-z0-9\s]/g) &&
            e.nativeEvent.text.length <= 20
        ) {
            setPassword(e.nativeEvent.text);
        }
    }, []);

    const numberSetter = useCallback((masked) => {
        setNumber(masked);
    }, []);

    const nameSetter = useCallback((e) => {
        setName(e.nativeEvent.text);
    }, []);

    const login = useCallback(() => {
        console.log({
            number: number,
            password: password,
            name: name,
        });

        if (number.length > 0 && password.length > 0 && name.length > 0) {
            socket.emit("SignUp", {
                number: number,
                password: password,
                name: name,
            });
        } else {
            setError("All the fields are required");
            setTimeout(() => setError(""), 3000);
        }
    }, []);

    socket.on("SignUp", (msg) => {
        if (msg.status == "fail") {
            setError(msg.reason);
            setTimeout(() => setError(""), 3000);
        } else {
            setSuccess("You may now log in!");
        }
    });

    return (
        <View style={[styles.container, styles.center]}>
            <View style={[styles.form, styles.center]}>
                <Text style={styles.error}>{error ? `*${error}*` : null}</Text>
                <Text style={styles.success}>
                    {error ? `${success}` : null}
                </Text>

                <Input
                    value={number}
                    onChangeText={numberSetter}
                    mask={numberMask}
                    name={"Number"}
                />

                <Input
                    value={name}
                    onChange={nameSetter}
                    name={"Name"}
                />

                <Input
                    value={password}
                    onChange={passwordSetter}
                    name={"Password"}
                />

                <TouchableOpacity
                    style={[styles.button, styles.center]}
                    onPress={login}>
                    <Text>Sign up</Text>
                </TouchableOpacity>
                <View style={[styles.sign, styles.center]}>
                    <Text style={styles.text}>Already have an account?</Text>
                    <Text
                        style={[styles.blue, styles.text]}
                        onPress={() => router.replace("Login/")}>
                        log in
                    </Text>
                </View>
            </View>
        </View>
    );
};

const numberMask = [
    "(",
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
];

export default Login;
