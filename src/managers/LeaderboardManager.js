const BaseManager = require('./BaseManager');
const FriendsXPLeaderboard = require('../structures/FriendsXPLeaderboard');
const DailyXPLeaderboard = require('../structures/DailyXPLeaderboard');
const WeeklyXPLeaderboard = require('../structures/WeeklyXPLeaderboard');
const MonthlyXPLeaderboard = require('../structures/MonthlyXPLeaderboard');
const LifetimeXPLeaderboard = require('../structures/LifetimeXPLeaderboard');
const RankedLeaderboard = require('../structures/RankedLeaderboard');
const Routes = require('../util/Routes');

/**
 * Manages API methods for Leaderboards.
 * @extends {BaseManager}
 */
class LeaderboardManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  async fetchFriendsXP() {
    const friends = await this.client.friends.fetch({ force: true });
    if(!friends.size < 2) throw new Error('NOT_ENOUGH_FRIENDS');

    const response = await this.client.rest.get(Routes.XP_LEADERBOARD_FRIENDS());
    return new FriendsXPLeaderboard(this.client, response);
  }

  async fetchDailyXP() {
    const response = await this.client.rest.get(Routes.XP_LEADERBOARD_DAILY());
    return new DailyXPLeaderboard(this.client, response);
  }

  async fetchWeeklyXP() {
    const response = await this.client.rest.get(Routes.XP_LEADERBOARD_WEEKLY());
    return new WeeklyXPLeaderboard(this.client, response);
  }

  async fetchMonthlyXP() {
    const response = await this.client.rest.get(Routes.XP_LEADERBOARD_MONTHLY());
    return new MonthlyXPLeaderboard(this.client, response);
  }

  async fetchXP() {
    const response = await this.client.rest.get(Routes.XP_LEADERBOARD());
    return new LifetimeXPLeaderboard(this.client, response);
  }

  async fetchRanked({ offset = false } = {}) {
    if(typeof offset !== 'boolean') {
      throw new Error('OPTION_MUST_BE_A_BOOLEAN');
    }

    const response = await this.client.rest.get(Routes.RANKED_SEASON_LEADERBOARD(offset))
    return new RankedLeaderboard(this.client, response);
  }

}

module.exports = LeaderboardManager;
