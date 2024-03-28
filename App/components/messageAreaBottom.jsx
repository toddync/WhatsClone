import { TextInput, StyleSheet, TouchableOpacity, View } from "react-native";
import { memo, useContext, useState } from "react";
import uuid from "react-native-uuid";
import GlobalContext from "../contexts/global";

function MessageAreaBottom({ e }) {
    const { dimensions, socket } = useContext(GlobalContext.context);

    const vw = dimensions.width / 100;
    const vh = dimensions.height / 100;

    const styles = StyleSheet.create({
        Wrapper: {
            height: vh * 10,
            width: "100%",
            backgroundColor: "rgba(0,0,0,0)",
            paddingTop: 5,
            position: "absolute",
            bottom: 0,
        },
        Digitate: {
            height: vh * 11,
            borderRadius: 10,
            width: 85 * vw,
            marginBottom: 5,
            marginLeft: 5,
        },
        Input: {
            width: 100 * vw - (11 * vh * 0.6 + 2.5 * vh),
        },
        Send: {
            flex: 1,
            position: "absolute",
            height: 11 * vh * 0.6,
            width: 11 * vh * 0.6,
            top: 1.2 * vh,
            right: 1 * vh,
            backgroundColor: "green",
            borderRadius: vh * 5.5,
        },
    });

    const [newMessage, setNewMessage] = useState("");

    function send() {
        if (newMessage.length > 0) {
            let message = {
                _id: uuid.v4(),
                createdAt: new Date(),
                text: newMessage,
                receiver: "",
                user: {
                    ...e.user,
                },
            };

            // db.transaction((tx) => {
            //     tx.executeSql(
            //         "INSERT INTO messages (sender, message) VALUES (?,?)",
            //         ["Male", newMessage],
            //         (_, Result) => {
            socket.emit("message", message);
            e.onSend([message]);
            setNewMessage("");
        }
        //     );
        // });
        // }
    }

    return (
        <View style={styles.Wrapper}>
            <View style={styles.Digitate}>
                <TextInput
                    style={styles.Input}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.nativeEvent.text)}
                />
            </View>
            <TouchableOpacity
                style={styles.Send}
                onPress={send}
            />
        </View>
    );
}

export default memo(MessageAreaBottom);
