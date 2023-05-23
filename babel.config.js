module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module:react-native-dotenv',
                {
                    envName: 'APP_ENV',
                    moduleName: '@env',
                    path: '.env.local',
                },
            ],
            [
                'react-native-reanimated/plugin',
                { relativeSoureLLocation: true },
            ],
        ],
    };
};
