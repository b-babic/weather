# Weather

![Alt text](screenshots/home.png 'Screenshot of the home page')

# Notes!

- At the time of making this showcase, I wasn't been able to use **mac** machine.
- Running and testing was only performed on **android**.

## Basic info

    - Emulator used: **Pixel_2_API_28**;
    - There is also **emulator.sh** at the root. You can chmod a+X ./emulator.sh and then run it with ./emulator.sh;
    - Api keys are stored in utils folder. In real life, api keys wont be commited to the git (use runtime or buildtime vars);
    - **Screenshots** are provided also in the screenshots folder.

### Tech

- I've tried to use latest **react-native**. Currently app is built using **0.60.5** version;
- Regarding shared state, **mobx** is used in conjuction with **async storage** for **persistance** purposes;
- **Navigation** is built using **router-flux** (never header of it before, I wanted to try);
- Besides shared state, I've made some **hooks and contexts** for themeing purposes;
- Ive added **progressive image** loader on the home page;
- Splash screen should be added also;
- On adding new city screen, I've been testing algolia places api. There is some validation, but the api is returning many things such ass cities, countries, streets, villages.

### Installation

Before you begin, Install the dependencies and devDependencies and start the server.

```sh
$ cd weather
$ npm install or yarn
```

### Development

Open your favorite Terminal and run these commands.

First Tab:

```sh
$ ./emulator.sh or run android emulator
```

Second Tab:

```sh
$ yarn start or npm run start
```

Third:

```sh
$ yarn run:android
```
