<p align="center" style="margin-bottom: 50px; margin-top: 50px;">
<img src="./src/assets/task-list-icon.png" width="300">
</p>

# Welcome to TaskListApp!

## Setup instructions

First make sure you have setup react native environment as given [here](https://reactnative.dev/docs/environment-setup)

Clone the repo and install dependencies

```bash
 git clone git@github.com:preetb123/TaskListApp.git
 cd TaskListApp
 yarn install
```

## To run the app on simulator(iOS)/emulator(android)

```shell
# make sure you have started the packager before
yarn start
# in another tab, run the application
# for iOS
yarn ios

# for android
yarn android
```

## Frameworks and libraries used

- [react-native cli](https://reactnative.dev/docs/environment-setup) with `typescript` for setting up the app
- [firebase](https://firebase.google.com/firebase) for authentication and storing tasks
- [mobx-state-tree](https://mobx-state-tree.js.org/intro/welcome) for client side state management
- [react-query](https://react-query.tanstack.com/) to facilitate communication with firebase
- [restyle](https://github.com/Shopify/restyle) for app-wide theming and building custom components lib
- [react-navigation](https://reactnavigation.org/) for managing navigation
- [react-hook-form](https://react-hook-form.com/) for form management with [zod](https://github.com/colinhacks/zod) for validation
- [react-native-toast-message](https://www.npmjs.com/package/react-native-toast-message) for displaying toasts
- [storybook](https://storybook.js.org/) for isolated component development
- [moti](https://moti.fyi/) for animations, this lib is built on top of [Reanimated 2](https://github.com/software-mansion/react-native-reanimated)
- [react-native-bootsplash](https://github.com/zoontek/react-native-bootsplash) for splashscreen

All icons used are SVGs

## Quick Start

App strcture is as below:

```
TaskListApp
├── src
│   ├── components
│   ├── utils
│   ├── models
│   ├── navigation
│   ├── screens
│   ├── services
│   ├── theme
│   ├── app.tsx
├── storybook
│   ├── views
│   ├── index.tsx
│   ├── addons.ts
│   ├── rn-addons.ts
│   ├── toggle-storybook.tsx
├── README.md
├── android
│   ├── app
│   ├── build.gradle
│   ├── gradle
│   ├── gradle.properties
│   ├── gradlew
│   ├── gradlew.bat
│   ├── keystores
│   └── settings.gradle
├── index.js
├── ios
│   ├── GoferApp
│   ├── GoferApp.xcodeproj
│   └── GoferAppTests
├── e2e
│   ├── config.json
│   ├── environment.ts
│   ├── login-flow.e2e.ts
│   ├── create-task-flow.e2e.ts
│   ├── logout-flow.e2e.ts
│   ├── search-update-task-flow.e2e.ts
├── .env
└── package.json
```

### `./src` directory

hosts most of the source of the app

**components**
This is where your React components will live. Each component will have a directory containing the `.tsx` file, along with a story file.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigation**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, talking to firebase, etc.).

**theme**
Here lives the theme for your application, including spacing, colors, and typography. We use [restyle](https://github.com/Shopify/restyle) for theming.

**utils**
This has storage related modules

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.

### `./storybook` directory

This is where your stories will be registered and where the Storybook configs will live.

## Running Storybook

From the command line in your generated app's root directory, enter `yarn run storybook`
This starts up the storybook server and opens a story navigator in your browser. With your app
running, choose Toggle Storybook from the developer menu to switch to Storybook

## Running `e2e` tests

Make sure you follow all instructions care fully as give [here](https://github.com/wix/Detox/blob/master/docs/Introduction.GettingStarted.md)

We first need to build the app to run tests on

`iOS`:

```shell
yarn build:e2e:ios
yarn test:e2e:ios
```

`Android`:

```shell
yarn build:e2e:android
yarn test:e2e:android
```

You'll get below output once all tests pass

```shell
% yarn test:e2e:ios
yarn run v1.22.10
$ detox test -c ios
 PASS  e2e/logout-flow.e2e.ts (17.318 s)
  logout flow
    ✓ should logout the user and navigate to login screen (5106 ms)

 PASS  e2e/login-flow.e2e.ts (12.299 s)
  Login flow
    ✓ should have login screen (1042 ms)
    ✓ should navigate to task list screen on successful login (7190 ms)

 PASS  e2e/search-update-task-flow.e2e.ts (17.429 s)
  search and update task status
    ✓ search and update a task status (6722 ms)

 PASS  e2e/create-task-flow.e2e.ts (17.874 s)
  Create task flow
    ✓ should create a task (7570 ms)

✨  Done in 66.40s.
```
