module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        env: {
            production: {
                plugins: [
                    "react-native-paper/babel",
                    "expo-router/babel",
                    [
                        "module-resolver",
                        {
                            root: ".",
                            extensions: [
                                ".js",
                                ".jsx",
                                ".ts",
                                ".tsx",
                                ".android.js",
                                ".android.tsx",
                                ".ios.js",
                                ".ios.tsx",
                            ],
                            alias: {
                                Components: "./components",
                            },
                        },
                    ],
                ],
            },
        },
    };
};
