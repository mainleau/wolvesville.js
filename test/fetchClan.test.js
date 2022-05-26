require('dotenv').config();
const { Client } = require('../src');

new Client().login()
  .then(async client => {
    client.clans.fetchOwn().then(console.log).catch(() => {});
    client.clans.fetchById('04c08a95-9452-408e-b7a5-7023bde1cc72').then(console.log);
    client.clans.query('La Banda').then(x => console.log(x.first()));
    client.clans.fetchByPlayerId('86892899-2fa1-4e00-a0dc-975769abe9fb').then(console.log);
  });
