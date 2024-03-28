import * as React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import TextAvatar from "./TextAvatar";
import Container from "./Container";
import { router } from "expo-router";
import Counter from "./counter";
import { theme } from "../constants";
import GlobalContext from "../contexts/global";

let now = new Date();
now = `${now.getHours() < 10 ? "0" + now.getHours() : now.getHours()}:${
    now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()
}`;

//todo pass the items bellow as props to render the component dynamically instead of statically, like a fucking looser
//todo in order of priority
//? last message (the hour is a part of the message)
//? name
//? unread messages count
//? avatar image?
export default function Conversation(props) {
    const { dimensions } = React.useContext(GlobalContext.context);
    const [hourWidth, setHourWidth] = React.useState(0);

    const styles = StyleSheet.create({
        avatar: {
            width: 60,
            height: 60,
            marginLeft: 5,
        },
        ripple: {
            justifyContent: "center",
            width: "100%",
            height: 80,
        },
        container: {
            padding: 15,
            paddingLeft: 8,
            paddingRight: 10,
        },
        mainContainer: {
            padding: 15,
            paddingLeft: 8,
            paddingRight: 10,
            border: 1,
            borderColor: "red",
        },
        text: {
            maxWidth: (dimensions.width - 60 - hourWidth) * 0.9,
            maxHeight: "50%",
            overflow: "hidden",
        },
        hour: {
            color: "black", //theme.dark.colors.accent,
        },
    });

    return (
        <Container.Row>
            <TouchableOpacity
                style={styles.ripple}
                rippleColor="rgba(0, 0, 0, .07)"
                onPress={() => router.push(`Messages/`)}>
                <Container.Row>
                    <TextAvatar
                        style={styles.avatar}
                        label="D"
                    />
                    <Container.Column style={styles.mainContainer}>
                        <Text
                            style={styles.text}
                            numberOfLines={1}>
                            oi
                        </Text>
                        <Text
                            style={styles.text}
                            numberOfLines={1}>
                            Crucifix de modus de tarried de colon de margarine
                            de cosine.
                        </Text>
                    </Container.Column>
                    <Container.Right.Column style={styles.container}>
                        <Text
                            onLayout={(e) =>
                                setHourWidth(e.nativeEvent.layout.width)
                            }
                            style={styles.hour}>
                            {now}
                        </Text>
                        <Counter count={2} />
                    </Container.Right.Column>
                </Container.Row>
            </TouchableOpacity>
        </Container.Row>
    );
}
