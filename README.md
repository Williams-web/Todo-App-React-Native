# Todo-App

A simple, modern cross-platform Todo application built with [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/). Manage your tasks efficiently with persistent storage and a clean UI.

## Features

- Add, edit, and delete todos
- Mark tasks as complete/incomplete
- Search todos by title
- Persistent storage using AsyncStorage
- Responsive design for Android, iOS, and Web
- File-based routing with [expo-router](https://docs.expo.dev/router/introduction/)
- Custom icons and profile image

## Screenshots
![github pic](https://github.com/user-attachments/assets/690b1c06-1d3b-4e56-8672-5029b6afbe02)
<Img source="https://github.com/user-attachments/assets/690b1c06-1d3b-4e56-8672-5029b6afbe02" height="150" width=100/>


## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd Todo-App
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the development server:**

   ```sh
   npx expo start
   ```

4. **Run on your device:**
   - Use the QR code in Expo Go (Android/iOS)
   - Or run on an emulator/simulator

## Project Structure

```
app/                # Main application code (screens, components)
assets/             # Images and fonts
.vscode/            # Editor settings
.expo/              # Expo config/types
```

- Main entry: [`app/index.tsx`](app/index.tsx)
- Routing: [`app/_layout.tsx`](app/_layout.tsx)

## Scripts

- `npm start` – Start Expo development server
- `npm run android` – Run on Android device/emulator
- `npm run ios` – Run on iOS simulator
- `npm run web` – Run in web browser
- `npm run lint` – Lint the codebase

## Customization

- App icon: [`assets/images/icon.png`](assets/images/icon.png)
- Splash screen: [`assets/images/splash-icon.png`](assets/images/splash-icon.png)
- Profile image: [`assets/images/Passport.jpg`](assets/images/Passport.jpg)

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the [MIT License](../Todo-App-React-Native/LICENSE).

---

Made with ❤️ using [Expo](https://expo.dev/) and [React Native](https://reactnative.dev/).
