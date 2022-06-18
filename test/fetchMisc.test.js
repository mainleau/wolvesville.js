require('dotenv').config();
const { Client } = require('../src');

new Client().login()
  .then(async client => {
    const player = await client.fetchPlayer();
    player.fetchAvatarSlots().then(console.log);
    player.fetchAnnouncements().then(console.log);
    player.fetchEquippedItems().then(console.log);
    player.fetchInventory().then(console.log);
    player.fetchClanRequests().then(console.log);
    player.fetchFriendReferralRewards().then(console.log);
    player.fetchDailyRewards().then(console.log);
    player.fetchGoldenWheelRewards().then(console.log);
    player.fetchChallenges().then(console.log);
    player.fetchBattlePassSeason().then(console.log);
    player.fetchRankedSeason().then(console.log);
    player.fetchCalendars().then(console.log);
    player.fetchSentGifts().then(console.log);
    player.fetchReceivedGifts().then(console.log);
    player.fetchFriendRequests().then(console.log);
    player.fetchCustomGamesOwnedRoles().then(console.log);
    player.fetchLimitedOffers().then(console.log);
  });
