require('dotenv').config();
const { Client } = require('../src');

new Client().login()
  .then(client => {
    client.fetchPlayer().then(console.log);
    client.players.fetchByUsername('Arnaud').then(console.log);
    client.players.fetchById('6646f6cf-0c85-46ab-a13e-6b6cd85265ea').then(console.log);
  });
