import { View } from "react-native";

let Container = ({ children }) => {
    return (
        <View style={{
            alignItems: "center",
        }}>
            {children}
        </View>
    )
};

Container.Row = ({ children }) => {
    return (
        <View style={{
            position: "relative",
            alignItems: "center",
            flexDirection: "row",
            alignItems: "center",
        }}>
            {children}
        </View >
    )
};

Container.Column = ({ children }) => {
    return (
        <View style={{
            position: "relative",
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "rgba(0, 0, 0, 0)",
            paddingTop: 15,
            paddingBottom: 15,
            paddingLeft: 5,
        }}>
            {children}
        </View>
    )
}
Container.Left = ({ children }) => {
    return (
        <View style={{
            position: "absolute",
            left: 0,
            height: "100%",
        }}>
            {children}
        </View>
    )
}

Container.Right = ({ children }) => {
    return (
        <View style={{
            position: "absolute",
            right: 0,
            height: "100%",
        }}>
            {children}
        </View>
    )
}

Container.Right.Column = ({ children }) => {
    return (
        <View style={{
            position: "absolute",
            right: 0,
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0)",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 15,
            paddingBottom: 15,
            paddingRight: 5
        }}>
            {children}
        </View>
    )
}

//todo Refactor using native styling, but only if necessary
//? Container.Left.Column = styled.View`
//?    position: absolute;
//?    left: 0;
//?     display: flex;
//?     height: 100%;
//?     justify-content: space-between;
//?     background-color: white;
//? `;

export default Container;
