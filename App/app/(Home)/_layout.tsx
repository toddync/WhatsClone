import {
    createMaterialTopTabNavigator,
    MaterialTopTabNavigationOptions,
    MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";

import { withLayoutContext } from "expo-router";

import { TabNavigationState, ParamListBase } from "@react-navigation/native";

const { Navigator } = createMaterialTopTabNavigator();

import { theme } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

const options = {
    tabBarStyle: { elevation: 0 },
};

export default function layout() {
    return (
        <MaterialTopTabs
            screenOptions={{
                tabBarIndicatorStyle: {
                    backgroundColor: theme.dark.colors.accent,
                },
                tabBarLabelStyle: { textTransform: "capitalize" },
            }}
        >
            <MaterialTopTabs.Screen name="conversations" options={options} />
            <MaterialTopTabs.Screen name="actualization" options={options} />
            <MaterialTopTabs.Screen name="calls" options={options} />
        </MaterialTopTabs>
    );
}
