'use strict';

const { Collection } = require('@discordjs/collection');
const Base = require('./Base');
const XPLeaderboardPlayer = require('./XPLeaderboardPlayer');

/**
 * Represents an xp leaderboard.
 * @extends {Base}
 */
class XPLeaderboard extends Base {
  constructor(client, data) {
    super(client);

    const leaderboard = data.ranks.map(
      (player, index) =>
        new XPLeaderboardPlayer(
          this.client,
          Object.assign(player, {
            rank: parseInt(index),
          }),
        ),
    );

    /**
     * XP leaderboard
     * @type {Collection<string, XPLeaderboardPlayer>}
     */
    this.entries = leaderboard.reduce((col, player) => col.set(player.id, player), new Collection());

    /**
     * Leaderboard update timestamp
     * @type {string}
     */
    this.updateTimestamp = new Date(data.nextUpdate).getTime();
  }
}

module.exports = XPLeaderboard;
