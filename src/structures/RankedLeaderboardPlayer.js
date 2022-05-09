'use strict';

const LeaderboardPlayer = require('./LeaderboardPlayer');

/**
 * Represents a ranked leaderboard player.
 * @extends {LeaderboardPlayer}
 */
class RankedLeaderboardPlayer extends LeaderboardPlayer {
  constructor(client, data) {
    super(client);

    /**
     * Player id
     * @type {string}
     */
    this.id = data.playerId;

    /**
     * Player username
     * @type {string}
     */
    this.username = data.username;

    /**
     * Player leaderboard skill points
     * @type {number}
     */
    this.skillPoints = data.skill;

    /**
     * Player leaderboard rank
     * @type {number}
     */
    this.rank = data.rank;
  }
}

module.exports = RankedLeaderboardPlayer;
