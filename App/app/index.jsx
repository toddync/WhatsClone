import { Suspense, useContext } from "react";
import { View, Text } from "react-native";
import { Redirect } from "expo-router";
import GlobalContext from "../contexts/global";

export default function Main() {
    const { userData, userDataSet } = useContext(GlobalContext.context);
    let logged = userData.name != undefined && userData.name != "";
    console.log(userDataSet);
    console.log(userData);

    return (
        <>
            <View
                style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <Text> loading</Text>
            </View>
            <Suspense>
                {userDataSet
                    ? logged
                        ? Redirect({ href: "(Home)/conversations" })
                        : Redirect({ href: "Login/" })
                    : null}
            </Suspense>
        </>
    );
}
//* Messages/1
