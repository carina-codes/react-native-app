Full Stack App Development Project (on hold due to SDK 52 issues)
- Front: React JS, React Native, Expo, NativeWind, Tailwind CSS, Animatable (animations), Expo Av (videos)
- Backend: CRUD, Appwrite (Auth, Database, Storage)

Followed https://github.com/adrianhajdin/aora/ React Native course, my version includes:
- Updated code to work with Expo Go latest update (SDK 52)
- Added a custom style file for customizations 

Why React Native
- Single codebase to work on iOS and Android (cross-platform)
- Save time, money while developing efficiently
- Use of Native components for better user experience
- Used by Meta, Discord, Microsoft, Coinbase, Call of Duty use React Native to build their mobile apps
- Hot reloading: to see real-time changes
- Strong community support

Expo
- Use of Expo to simplify the app build
- No need for Android Studio or Xcode
- Pre-built components for nav, gestures, camera, maps
- Over-the-air updates to auto-push releases
- Expo router, similar to Next JS
- Can eject and add additional features

Steps
1. Folder creation, https://docs.expo.dev/get-started/create-a-project/ ran: npx create-expo-app@latest ./ --template blank
2. package.json add "main": "expo-router/entry",
3. app.json add "scheme": "aora",
4. yarn add expo-router
5. yarn add react-native-screens
6. npx expo install react-native-safe-area-context
7. npx expo install expo-linking
8. Downloaded Expo Go app, ran: npx expo start
9. NativeWind, Tailwind CSS: https://www.youtube.com/watch?v=rV7wSsQaYWA + https://www.nativewind.dev/getting-started/expo-router
