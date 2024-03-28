import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "./RightBar";

export default function App() {
    return (
        <SafeAreaView>
            <TopBar dark={false} mode="small" />
            <Text>Home</Text>
        </SafeAreaView>
    );
}
