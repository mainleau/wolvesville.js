'use strict';

const { Collection } = require('@discordjs/collection');
const Base = require('./Base');
const RankedLeaderboardPlayer = require('./RankedLeaderboardPlayer');

/**
 * Represents a ranked leaderboard.
 * @extends {Base}
 */
class RankedLeaderboard extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Leadeboard offset
     * @type {number}
     */
    this.offset = data.offset;

    /**
     * Ranked leadeboard
     * @type {Collection<string, RankedLeaderboardPlayer>}
     */
    this.entries = new Collection();

    for (const index in Object.keys(data.seasonPlayerRanks)) {
      const player = data.seasonPlayerRanks[index];
      this.entries.set(
        player.playerId,
        new RankedLeaderboardPlayer(
          client,
          Object.assign(player, {
            rank: parseInt(index),
          }),
        ),
      );
    }

    /**
     * Whether the player is unranked
     * @type {boolean}
     */
    this.unranked = data.unranked;
  }
}

module.exports = RankedLeaderboard;
