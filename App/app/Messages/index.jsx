import { useCallback, useEffect, useRef, useState, useContext } from "react";
import { Platform } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import * as FileSystem from "expo-file-system";
import BubbleContainer from "../../components/BubbleContainer";
import MessageAreaBottom from "../../components/messageAreaBottom";
import GlobalContext from "../../contexts/global";
// const imgDir = FileSystem.documentDirectory + "images/"

// async function dirExists() {
//     const dirInfo = await FileSystem.getInfoAsync(imgDir)
//     if (!dirInfo.exists) {
//         await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true })
//     }
// }

export default function MessageArea() {
    const { db, dimensions } = useContext(GlobalContext.context);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (Platform.OS != "web") {
            db.transaction((tx) => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS
                        channels
                        (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT,
                            identifier INTEGER,
                            notifications INTEGER,
                            type INTEGER,
                            image TEXT,
                            isAdded INTEGER
                        )`
                );
            });
            db.transaction((tx) => {
                tx.executeSql(
                    `CREATE TABLE IF NOT EXISTS
                        messages
                        (
                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                            sender TEXT,
                            message TEXT,
                            createdAt TEXT,
                            identifier TEXT,
                            seen INTEGER,
                            channel TEXT,
                            media INTEGER,
                            paths TEXT
                        )`
                );
            });
        }

        setMessages([
            { _id: 1, text: "text", createdAt: new Date(), user: { _id: 2 } },
        ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
    }, []);

    const render = useCallback(
        (bubble) => <BubbleContainer bubble={bubble} />,
        []
    );

    return (
        <GiftedChat
            alignTop
            scrollToBottom
            renderAvatarOnTop
            renderAvatar={null}
            renderBubble={render}
            messages={messages}
            minInputToolbarHeight={dimensions.height / 10}
            renderInputToolbar={(e) => <MessageAreaBottom e={e} />}
            onSend={(msg) => onSend(msg)}
            user={{
                _id: 1,
            }}
        />
    );
}
