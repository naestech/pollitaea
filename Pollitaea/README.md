# Welcome Pollitaea [ignited app]

[![CircleCI](https://circleci.com/gh/infinitered/ignite.svg?style=svg)](https://circleci.com/gh/infinitered/ignite)

This is the boilerplate that [Infinite Red](https://infinite.red) uses.

Currently includes:

- React Native
- React Navigation
- MobX State Tree
- TypeScript
- ...etc etc etc

## Quick Start

Alright, first we'll set up our environment then we'll setup the project locally.

### Env Setup

- Install [Nodejs](https://nodejs.org/en)
- Install yarn `https://yarnpkg.com/getting-started/install`
  - Cleaner more efficient package manager than node's default `npm`
  - We'll use it to add install and run the project, note that whenever we're installing a package we'll need to do `yarn add <package-name>` instead of `npm install <package>`
- Install [android studio](https://developer.android.com/studio/preview) and android virtual device emulator
  - Also installs prepackaged java/kotlin I think
- Add a sick theme for your ide

### Project setup

- Clone project
- Install packages
  - `yarn` in the root of the project
- start the app
  - `expo start --android`

### ./app directory

Included in an Ignite boilerplate project is the `app` directory. This is a directory you would normally have to create when using vanilla React Native.

The inside of the `app` directory looks similar to the following:

```text
app
├── components
├── config
├── i18n
├── models
├── navigators
├── screens
├── services
├── theme
├── utils
├── app.tsx
```

## Ignite Helpers

Ignite has some helpful tooling to make this app dev process easier. You can use as much or as little as you want but I recommend at least trying to generate a screen and seein the magic a bit. Maybe checking out the [template](/ignite/templates/screen/NAMEScreen.tsx.ejs) that the generators use.

### ./ignite directory

The `ignite` directory stores all things Ignite, including CLI and boilerplate items. Here you will find templates you can customize to help you get started with React Native.

### ./test directory

This directory will hold your Jest configs and mocks.

**components**
This is where your reusable components live which help you build your screens.

**i18n**
This is where your translations will live if you are using `react-native-i18n`.

**models**
This is where your app's models will live. Each model has a directory which will contain the `mobx-state-tree` model file, test file, and any other supporting files like actions, types, etc.

**navigators**
This is where your `react-navigation` navigators will live.

**screens**
This is where your screen components will live. A screen is a React component which will take up the entire screen and be part of the navigation hierarchy. Each screen will have a directory containing the `.tsx` file, along with any assets or other helper files.

**services**
Any services that interface with the outside world will live here (think REST APIs, Push Notifications, etc.).

**theme**
~~Here lives the theme for your application, including spacing, colors, and typography.~~ This is the original theme directory but this can be replaced with whatever we want. In my own project I'm using [Tamagui](https://tamagui.dev/) but we can do this with raw css too. I'd prefer not though :)

**utils**
This is a great place to put miscellaneous helpers and utilities. Things like date helpers, formatters, etc. are often found here. However, it should only be used for things that are truly shared across your application. If a helper or utility is only used by a specific component or model, consider co-locating your helper with that component or model.

**app.tsx** This is the entry point to your app. This is where you will find the main App component which renders the rest of the application.

## Running Maestro end-to-end tests

Follow our [Maestro Setup](https://ignitecookbook.com/docs/recipes/MaestroSetup) recipe from the [Ignite Cookbook](https://ignitecookbook.com/)!
