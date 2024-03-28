import { StyleSheet, View, Text } from "react-native";
import { memo } from "react";
import Bubble from "./Bubble";

const styles = StyleSheet.create({
    notch: {
        left: {
            backgroundColor: "rgba(0,0,0,0)",
            width: 15,
            height: 15,
            position: "absolute",
            left: 5,
            borderBottomWidth: 20,
            borderBottomColor: "rgba(0,0,0,0)",
            borderRightWidth: 15,
            borderRightColor: "red",
        },
        right: {
            backgroundColor: "rgba(0,0,0,0)",
            width: 15,
            height: 15,
            position: "absolute",
            right: 5,
            borderBottomWidth: 20,
            borderBottomColor: "rgba(0,0,0,0)",
            borderLeftWidth: 15,
            borderLeftColor: "red"
        }
    },
    container: {
        left: {
            flex: 1,
            height: "auto",
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: "rgba(0,0,0,0)",
            position: "relative",
            borderColor: "blue",
            alignItems: "flex-start"
        },
        right: {
            flex: 1,
            height: "auto",
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: "rgba(0,0,0,0)",
            position: "relative",
            borderColor: "blue",
            alignItems: "flex-end"
        }

    }
}
)

function HasNotch(bubble) {
    if ("_id" in bubble.previousMessage) {
        if (bubble.currentMessage.user._id != bubble.previousMessage.user._id) {
            return true
        }
    } else {
        return true
    }
    return false
}

function BubbleContainer({ bubble }) {

    const style = StyleSheet.create({
        container: {
            flex: 1,
            height: "auto",
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: "rgba(0,0,0,0)",
            position: "relative",
            borderColor: "blue",
            alignItems: bubble.position == "right" ? "flex-end" : "flex-start"
        }
    });

    let notched = HasNotch(bubble)

    return (
        <View style={styles.container[bubble.position]}>
            {notched ? <View style={styles.notch[bubble.position]} /> : ""}
            <Bubble
                position={bubble.position}
                notched={notched}
            >
                <Text>
                    {bubble.currentMessage.text}
                </Text>

                <Text style={{ textAlign: "right" }}>
                    {bubble.currentMessage.createdAt.toLocaleTimeString().slice(0, 5)}
                </Text>
            </Bubble>
        </View>
    );
}

export default memo(BubbleContainer);