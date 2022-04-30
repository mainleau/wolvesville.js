const BasePlayer = require('./BasePlayer');

/**
 * Represents a player in leaderboard.
 * @extends {Base}
 */
class LeaderboardPlayer extends BasePlayer {
  constructor(client) {
    super(client);
  }
}

module.exports = LeaderboardPlayer;
