const Base = require('./Base');
const XPLeaderboardPlayer = require('./XPLeaderboardPlayer');
const LifetimeXPLeaderboardPlayer = require('./LifetimeXPLeaderboardPlayer');
const { Collection } = require('@discordjs/collection');

/**
 * Represents an xp leaderboard.
 * @extends {Base}
 */
class XPLeaderboard extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Xp leaderboard.
     * @type {Collection<string, XPLeaderboardPlayer|LifetimeXPLeaderboardPlayer>}
     */
    this.entries = new Collection();

    for (const index in Object.keys(data.ranks)) {
      const player = data.ranks[index];
      this.entries.set(
        index,
        this.constructor === XPLeaderboard
          ? new XPLeaderboardPlayer(client, Object.assign(player, {
              rank: parseInt(index)
            }))
          : new LifetimeXPLeaderboardPlayer(client, Object.assign(player, {
              rank: parseInt(index)
            }))
      )
    }
  }
}

module.exports = XPLeaderboard;
