require('dotenv').config();
const { Client } = require('../src');

new Client().login()
  .then(async client => {
    const querier = await client.clans.query('Mythical Beasts');
    console.log(querier.clans.first());
  });
