import { Stack } from "expo-router";
import GlobalContext from "../contexts/global";
import { Text } from "react-native";
import BarRight from "../components/BarRight";

export default function layout() {
    return (
        <GlobalContext.provider>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                        headerShadowVisible: false,
                    }}
                />
                <Stack.Screen
                    name="Login/index"
                    options={{
                        headerShown: false,
                        headerShadowVisible: false,
                    }}
                />
                <Stack.Screen
                    name="SignUp/index"
                    options={{
                        headerShown: false,
                        headerShadowVisible: false,
                    }}
                />
                <Stack.Screen
                    name="(Home)"
                    options={{
                        //* headerStyle: {
                        //*     backgroundColor: Theme.dark.colors.backGround,
                        //* },
                        headerTitle: () => <Text>WhatsClone</Text>,
                        headerRight: () => <BarRight />,
                        headerShadowVisible: false,
                    }}
                />
                <Stack.Screen
                    name="Messages/index"
                    options={{
                        headerShadowVisible: false,
                        headerTitle: () => <Text>.</Text>,
                    }}
                />
            </Stack>
        </GlobalContext.provider>
    );
}
