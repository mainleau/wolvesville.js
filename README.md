## About
wolvesville.js is a [Node.js](https://nodejs.org) module to interact with the [Wolvesville](https://app.wolvesville.com) API.

## Installation

**Latest version of Node.js required**
```sh-session
npm install wolvesville.js@dev
```

## Example usage

Log the username and level of the player with username `Arnaud`:
```javascript
const Wolvesville = require('wolvesville.js');

const client = new Wolvesville.Client();

client.login({
  email: 'mySecretEmail@gmail.com',
  password: 'mySecretPassword'
}).then(async client => {
  const player = await client.players.fetchByUsername('Arnaud');
  console.log(player.username, player.level)
});
```
