require('dotenv').config();
const { Client } = require('../src');

new Client().login()
  .then(async client => {
    const player = await client.fetchPlayer();
    player.fetchAnnouncements().then(console.log);
    player.fetchEquippedItems().then(console.log);
    player.fetchInventory().then(console.log);
    player.fetchClanRequests().then(console.log);
  });
