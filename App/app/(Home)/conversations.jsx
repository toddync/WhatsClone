import { FlatList, SafeAreaView, Text, Platform, View } from "react-native";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import uuid from "react-native-uuid";
import Conversation from "../../components/conversation";
import GlobalContext from "../../contexts/global";

const data = require("../../test/data.json");

function ConversationArea() {
    const { db, socket, userData } = useContext(GlobalContext.context);
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        if (Platform.OS == "web") return;
    }, []);

    const render = useCallback((item) => {
        return <Conversation key={uuid.v4()} />;
    }, []);

    if (channels.length == 0) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                }}>
                <Text
                    style={{
                        fontSize: Platform.OS != "web" ? 15 : "1.5rem",
                    }}>
                    You don't have any conversations yet
                </Text>
                <Text
                    style={{
                        fontSize: Platform.OS != "web" ? 15 : "1.5rem",
                    }}>
                    ...
                </Text>
            </View>
        );
    }

    return Platform.OS != "web" ? (
        <SafeAreaView>
            <FlatList
                style={{
                    backgroundColor: "white",
                }}
                data={channels}
                renderItem={render}
                estimatedItemSize={80}
            />
        </SafeAreaView>
    ) : (
        <FlatList
            style={{
                backgroundColor: "white",
            }}
            data={channels}
            renderItem={render}
            estimatedItemSize={80}
        />
    );
}

export default memo(ConversationArea);
