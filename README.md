# Playground AR

In this cross-platform Augmented Reality (AR) application, players look for and interact with hidden objects in order to discover coins. Collecting all the coins will allow the player to enter a portal where they are greeted with a nice winning screen, unless they run out of time. <br>
<img src="./assets/calibrate1.gif" height='300'>
<img src="./assets/calibrate2.gif" height='300'>

# Features

### Prerequisities & Installation

Fork the project to your github then clone via the following line inside your terminal:

```
git clone https://github.com/your_Github_Name/Playground.git
```

install the npm package with npm:

```
npm install
```

Install the Viro Media App from the <a href="https://play.google.com/store/apps/details?id=com.viromedia.viromedia&hl=en_US"> Google Playstore </a> or the <a href="https://apps.apple.com/us/app/viro-media/id1163100576">App Store </a>. <br />

Sign up for an API key from <a href="https://viromedia.com/signup">ViroMedia</a>. <br />

In your Playground root directory, create a file called my_API_KEY.js with the following format:

```
export default sharedProps = {
   apiKey: 'YOUR VIRO API KEY'
};

export const IPAddress = "YOUR LOCAL IPv4 ADDRESS" //In your terminal type "ipconfig getifaddr en0" to retrieve your local IP address
```

Then, open up a second instance of the terminal. In the first instance, type:

```
npm start
```

And in the second, type:

```
npm run server
```

Have fun playing Playground AR, where the world becomes your Playground!

## Built With

- [React Native](https://facebook.github.io/react-native/) - Framework for Android and ios
- [Node.js](https://nodejs.org/en/) - JavaScript Runtime
- [Viro](https://viromedia.com/) - AR/VR Library
- [Axios](https://www.npmjs.com/package/axios) - HTTP client

## Created By

- **John Vitales**
- **Robert Schnek**
- **Harsh Patel**
- **Ethan King**
