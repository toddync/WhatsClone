import { createContext, useEffect, useState } from "react";
import { Platform, useWindowDimensions } from "react-native";
import * as fileSystem from "expo-file-system";
import * as Sqlite from "expo-sqlite";
import { io } from "socket.io-client";

let GlobalContext = {};

GlobalContext.context = createContext({});

async function getUserData(setUserData, setUserDataSet) {
    if (Platform.OS != "web") {
        const dirInfo = await fileSystem.getInfoAsync(
            fileSystem.documentDirectory + "/user.json"
        );
        if (!dirInfo.exists) {
            await fileSystem.writeAsStringAsync(
                fileSystem.documentDirectory + "/user.json",
                JSON.stringify({ name: "", identifier: "" })
            );
        }

        setUserData(
            JSON.parse(
                await fileSystem.readAsStringAsync(
                    fileSystem.documentDirectory + "/user.json"
                )
            )
        );
    } else {
        if (!localStorage.getItem("user")) {
            localStorage.setItem(
                "user",
                JSON.stringify({ name: "", identifier: "" })
            );
        }

        setUserData(JSON.parse(localStorage.getItem("user")));
    }

    setUserDataSet(true);
}

async function saveUserData(setUserData, userData) {
    if (Platform.OS != "web") {
        await fileSystem.writeAsStringAsync(
            fileSystem.documentDirectory + "/user.json",
            JSON.stringify(userData)
        );
    } else {
        localStorage.setItem("user", JSON.stringify(userData));
    }

    setUserData(userData);
}

GlobalContext.provider = ({ children }) => {
    const socket = io("http://192.168.1.105:3000");
    const db = Platform.OS != "web" ? Sqlite.openDatabase("WhatsClone.db") : {};
    const dimensions = useWindowDimensions();
    const [userData, setUserData] = useState({});
    const [userDataSet, setUserDataSet] = useState(false);

    useEffect(() => {
        getUserData(setUserData, setUserDataSet);
    }, []);

    return (
        <GlobalContext.context.Provider
            value={{
                db: db,
                dimensions: dimensions,
                socket: socket,
                userData: userData,
                setUserData: setUserData,
                saveUserData: saveUserData,
                userDataSet: userDataSet,
            }}>
            {children}
        </GlobalContext.context.Provider>
    );
};

export default GlobalContext;
