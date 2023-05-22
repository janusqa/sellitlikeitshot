# project setup
$ npx create-expo-app@latest --template .
$ touch tsconfig.json
$ npx expo start

```tsconfig.json
{
    "compilerOptions": {
        "strict": true
    },
    "exclude": ["node_modules"],
    "include": [
        ".eslintrc.cjs",
        "babel.config.js",
        "**/*.ts",
        "**/*.tsx",
        "**/*.cjs",
        "**/*.mjs"
    ],
    "extends": "expo/tsconfig.base"
}
```

# emulators
$ ~/hd2/applications/android-sdk/emulator/emulator -list-avds
$ ~/hd2/applications/android-sdk/emulator/emulator -avd Pixel_6_API_31_-_ReactNative_Expo -no-snapshot-load

# Linting
1.
$ npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin @types/eslint @types/react @types/react-native eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-native

2.
$ touch .eslintrc.cjs
  ```
/** @type {import("eslint").Linter.Config} */
const config = {
    overrides: [
        {
            extends: [
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                project: 'tsconfig.json',
            },
        },
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/jsx-runtime',
    ],
    rules: {
        '@typescript-eslint/consistent-type-imports': [
            'warn',
            {
                prefer: 'type-imports',
                fixStyle: 'inline-type-imports',
            },
        ],
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksVoidReturn: {
                    attributes: false,
                },
            },
        ],
    },
};

module.exports = config;

  ```
3.
$ touch .eslintignore
  ```
  node_modules

  ```
4.
add ```"lint": "eslint . --ext .js,.jsx,.ts,.tsx"``` to "scripts" key of package.json

5. add to tsconfig.json if not already there
```
   {
    "compilerOptions": {
        "strict": true
    },
    "exclude": ["node_modules"],
    "include": [".eslintrc.cjs", "**/*.ts", "**/*.tsx", "**/*.cjs", "**/*.mjs"],
    "extends": "expo/tsconfig.base"
}
```

# Debugging
Add "jsEngine": "jsc" to app.json and restart expo in vscode and emulator
Install the stand alone react-native-debuger.  In it click on "Debugger" menu and "New window"
enter port that metro is running on, mostly it is 19000
then click "m" in terminal to lanch dev menu on emulator.
"Debug Remote JS" should now be visible. click it to connect to react-native-debugger

# Navigation
$ npm install @react-navigation/native
$ npx expo install react-native-screens react-native-safe-area-context react-native-reanimated react-native-gesture-handler @react-native-masked-view/masked-view

# Native-Stack Navigator
$ npm install @react-navigation/native-stack

# Tab Navigator
$ npm install @react-navigation/bottom-tabs

# Drawer Navigator
$ npm install @react-navigation/drawer
$ npm install react-native-gesture-handler react-native-reanimated
>> add this to babel.config.js
```
       plugins: [
            [
                'react-native-reanimated/plugin',
                { relativeSoureLLocation: true },
            ],
        ],
```

# Redux Tookit
$ npm install @reduxjs/toolkit react-redux
$ npm i -D @types/react-redux

# nanoid
$ npm i nanoid react-native-get-random-values
$ npm i -D @types/react-native-get-random-values
```
import 'react-native-get-random-values';
import { nanoid } from 'nanoid/non-secure';
```

# zod validation
$ npm i zod zod-validation-error
```
import {z} from 'zod'
import {fromZodError} from 'zod-validation-error'
```

# local storage
$ npx expo install expo-secure-store // secure storage
$ npx expo install @react-native-async-storage/async-storage // unsecure storage 

# Load and intial loading screen untill resources are loaded
$ npx expo install expo-splash-screen
import * as SplashScreen from 'expo-splash-screen';
can change resizeMode to "cover" in app.json to make splash take entire screen
can also change baground color to match splash so there is no precievable flicker

# .env
$ npm install -D react-native-dotenv
now update babel.config.js
```
{
  "plugins": [
    ["module:react-native-dotenv"]
  ]
}
```
now in env.d.ts define your env const types like 
```
declare module '@env' {
    export const WEBAPIKEY: string;
    export const AUTHURL: string;
}
```
Now you can place the above varibalbes in the .env files as usual and in the files where you need constants import them like
import {MY_CONST} from '@env'


# Camera
npx expo install expo-image-picker expo-media-library expo-camera expo-location expo-constants expo-intent-launcher

add to app.json
```
"plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ],
            [
        "expo-media-library",
        {
          "photosPermission": "Allow $(PRODUCT_NAME) to access your photos.",
          "savePhotosPermission": "Allow $(PRODUCT_NAME) to save photos.",
          "isAccessMediaLocationEnabled": true
        }
      ]
    ]
```

# Location
$ npx expo install expo-location
$ npx expo install react-native-maps // for working with fullscreen maps

# sqlitedb locally on the device
$ npx expo install expo-sqlite

# notification - local notifications
https://docs.expo.dev/versions/latest/sdk/notifications/
$ npx expo install expo-notifications
$ npx expo install expo-device

add something similar to app.json "expo" node
```
    "android": {
      "useNextNotificationsApi": true
    }
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/notification-icon.png",
          "color": "#ffffff",
          "sounds": [
            "./assets/notification-sound.mp3"
          ]
        }
      ]
    ]
```

# notifications - push notifications
We need to request permissions to use this
These are sent thru google/apple servers
need a push token which represents who the notification should be sent too

Test push notifications can be done using tool from expo 
https://expo.dev/notifications

sending from a backend https://docs.expo.dev/push-notifications/sending-notifications/
checke out http/2 api

Four (4) steps to follow for Push Notifications
- Register the app with expo to get a token. (One token per user/group of users)
- Store token with on server and associate it with a user/group
- Send notification (this happens on the server mostly)
  - example sending message to a user. On client we tap send button. Message is sent to server and store there and the target user is notified.
- Handle received notifications. This is what happens when the user taps on a notification

# Hooks: Very good library to handle things like device orientation
npm i @react-native-community/hooks@latest

# Gesture Handlers
$ npx expo install react-native-gesture-handler

# Forms
npm i zod react-hook-form @hookform/resolvers

# React-Query
npm i  npm i @tanstack/react-query 
npx expo install @react-native-community/netinfo

# Loading animations
npx expo install lottie-react-native
https://lottiefiles.com   <- get nice loading animations here. Download as json file then load
with package above

# Progress bars 
-- these provides animations for progress bars for uploading/downloading etc
-- a good example is to use it with axios progress feature.  See useAddListing.ts and istingEditScreen.tsx
npm install react-natinve-progress

# Offline Startegies
See offline_strategies.png in root folder

# Decode jwt on frontend
npm i jwt-decode

# Persist sessions with secure storage
npx expo install expo-secure-store