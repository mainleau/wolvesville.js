require('dotenv').config();
const { Client } = require('../src');

new Client().login()
  .then(async client => {
    const player = await client.players.fetchByUsername('Arnaud');
    console.log(player);
  });
