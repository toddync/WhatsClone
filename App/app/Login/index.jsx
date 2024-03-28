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
    const { dimensions, socket, setUserData, userData, saveUserData } =
        useContext(GlobalContext.context);

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
    });

    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [error, setError] = useState("");

    const passwordSetter = useCallback((masked) => {
        if (!masked.match(/[^A-Za-z0-9\s]/g) && masked.length <= 50) {
            setPassword(masked);
        }
    }, []);

    const numberSetter = useCallback((masked) => {
        setNumber(masked);
    }, []);

    const login = useCallback(() => {
        console.log({ number: number, password: password });
        if (number.length > 0 && password.length > 0) {
            socket.emit("Login", { number: number, password: password });
        }
    }, [number, password]);

    socket.on("Login", (msg) => {
        if (msg.status == "fail") {
            setError(msg.reason);
            setTimeout(() => setError(""), 3000);
        } else {
            saveUserData(setUserData, msg.userData);
            setUserData(msg.userData);
            router.replace("(Home)/conversations");
        }
    });

    return (
        <View style={[styles.container, styles.center]}>
            <View style={[styles.form, styles.center]}>
                <Text style={styles.error}>
                    {error ? `* ${error} *` : null}
                </Text>

                <Input
                    value={number}
                    onChangeText={numberSetter}
                    mask={numberMask}
                    name={"Number"}
                />
                <Input
                    value={password}
                    onChangeText={passwordSetter}
                    name={"Password"}
                />

                <TouchableOpacity
                    style={[styles.button, styles.center]}
                    onPress={login}>
                    <Text>Log in</Text>
                </TouchableOpacity>
                <View style={[styles.sign, styles.center]}>
                    <Text style={styles.text}>Don't have an account yet?</Text>
                    <Text
                        style={[styles.blue, styles.text]}
                        onPress={() => router.replace("SignUp/")}>
                        sign up
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
