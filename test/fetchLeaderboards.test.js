require('dotenv').config();
const { Client } = require('../src');

new Client().login()
  .then(async client => {
    const friends = await client.leaderboards.fetchFriendsXP().catch(() => {});
    console.log(friends);
    const daily = await client.leaderboards.fetchDailyXP();
    console.log(daily);
    const weekly = await client.leaderboards.fetchWeeklyXP();
    console.log(weekly);
    const monthly = await client.leaderboards.fetchMonthlyXP();
    console.log(monthly);
    const lifetime = await client.leaderboards.fetchXP();
    console.log(lifetime);
    const ranked = await client.leaderboards.fetchRanked();
    console.log(ranked);
  });
