'use strict';

const BaseManager = require('./BaseManager');
const DailyXPLeaderboard = require('../structures/DailyXPLeaderboard');
const FriendsXPLeaderboard = require('../structures/FriendsXPLeaderboard');
const LifetimeXPLeaderboard = require('../structures/LifetimeXPLeaderboard');
const MonthlyXPLeaderboard = require('../structures/MonthlyXPLeaderboard');
const RankedLeaderboard = require('../structures/RankedLeaderboard');
const WeeklyXPLeaderboard = require('../structures/WeeklyXPLeaderboard');
const Routes = require('../util/Routes');

/**
 * Manages API methods for Leaderboards.
 * @extends {BaseManager}
 */
class LeaderboardManager extends BaseManager {
  /**
   * Fetch friends xp leaderboard.
   * @returns {FriendsXPLeaderboard}
   */
  async fetchFriendsXP() {
    const friends = await this.client.friends.fetch({ force: true });
    if (!friends.size < 2) throw new Error('NOT_ENOUGH_FRIENDS');

    const response = await this.client.rest.get(Routes.XP_LEADERBOARD_FRIENDS());
    return new FriendsXPLeaderboard(this.client, response);
  }

  /**
   * Fetch daily xp leaderboard.
   * @returns {DailyXPLeaderboard}
   */
  async fetchDailyXP() {
    const response = await this.client.rest.get(Routes.XP_LEADERBOARD_DAILY());
    return new DailyXPLeaderboard(this.client, response);
  }

  /**
   * Fetch weekly xp leaderboard.
   * @returns {WeeklyXPLeaderboard}
   */
  async fetchWeeklyXP() {
    const response = await this.client.rest.get(Routes.XP_LEADERBOARD_WEEKLY());
    return new WeeklyXPLeaderboard(this.client, response);
  }

  /**
   * Fetch monthly xp leaderboard.
   * @returns {MonthlyXPLeaderboard}
   */
  async fetchMonthlyXP() {
    const response = await this.client.rest.get(Routes.XP_LEADERBOARD_MONTHLY());
    return new MonthlyXPLeaderboard(this.client, response);
  }

  /**
   * Fetch xp leaderboard.
   * @returns {LifetimeXPLeaderboard}
   */
  async fetchXP() {
    const response = await this.client.rest.get(Routes.XP_LEADERBOARD());
    return new LifetimeXPLeaderboard(this.client, response);
  }

  /**
   * Fetch ranked leaderboard.
   * @param {boolean} [offset=false] Whether the leaderboard is based on your rank
   * @returns {RankedLeaderboard}
   */
  async fetchRanked({ offset = false } = {}) {
    if (typeof offset !== 'boolean') {
      throw new Error('OPTION_MUST_BE_A_BOOLEAN');
    }

    const response = await this.client.rest.get(Routes.RANKED_SEASON_LEADERBOARD(offset));
    return new RankedLeaderboard(this.client, response);
  }
}

module.exports = LeaderboardManager;
