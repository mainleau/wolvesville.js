'use strict';

const BasePlayer = require('./BasePlayer');

/**
 * Represents a friend request player.
 * @extends {BasePlayer}
 */
class FriendRequestPlayer extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Player id.
     * @type {string}
     */
    this.id = data.id;

    /**
     * Player username.
     * @type {string}
     */
    this.username = data.username;

    /**
     * Player clan tag.
     * @type {string}
     */
    this.clanTag = data.clanTag || null;

    /**
     * Player level.
     * @type {number}
     */
    this.level = data.level;

    /**
     * Player status.
     * @type {number}
     */
    Object.defineProperty(this, 'status', { value: data.playersStatus });

    /**
     * Player last online timestamp.
     * @type {number}
     */
    Object.defineProperty(this, 'lastOnlineTimestamp', { value: new Date(data.lastOnline).getTime() });

    /**
     * Player last online timestamp.
     * @type {number}
     */
    Object.defineProperty(this, 'equippedItems', {
      value: {
        icon: {
          id: data.profileIconId || null,
          color: data.profileIconColor || null,
        },
      },
    });
  }

  /**
   * Clan tag and username.
   * @type {string}
   * @readonly
   */
  get clanTagAndUsername() {
    return this.clanTag ? `${this.clanTag} | ${this.username}` : this.username;
  }

  /**
   * Wether the player is online.
   * @type {boolean}
   * @readonly
   */
  get online() {
    return this.lastOnlineTimestamp + 10 * 60 * 1000 > Date.now();
  }
}

module.exports = FriendRequestPlayer;
