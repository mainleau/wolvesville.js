require('dotenv').config();
const { Client } = require('../src');

new Client().login()
  .then(async client => {
    client.leaderboards.fetchFriendsXP().then(console.log).catch(() => {});
    client.leaderboards.fetchDailyXP().then(console.log);
    client.leaderboards.fetchWeeklyXP().then(console.log);
    client.leaderboards.fetchMonthlyXP().then(console.log);
    client.leaderboards.fetchXP().then(console.log);
    client.leaderboards.fetchRanked().then(console.log);
  });
