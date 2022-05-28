'use strict';

const BasePlayer = require('./BasePlayer');
const EquippedItems = require('./EquippedItems');

/**
 * Represents a friend request player.
 * @extends {BasePlayer}
 * @abstract
 */
class FriendRequestPlayer extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Player id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Player username
     * @type {string}
     */
    this.username = data.username;

    /**
     * Player clan tag
     * @type {string}
     */
    this.clanTag = data.clanTag || null;

    /**
     * Player level
     * @type {number}
     */
    this.level = data.level;

    /**
     * Player status
     * @type {number}
     */
    this.status = data.playerStatus;

    /**
     * Player equipped items
     * @type {EquippedItems}
     */
    this.equippedItems = new EquippedItems(client, {
      profileIcon: {
        id: data.profileIconId,
        color: data.profileIconColor,
      }
    });

    /**
     * Player last online timestamp
     * @type {number}
     */
    this.lastOnlineTimestamp = new Date(data.lastOnline).getTime();
  }

  /**
   * Clan tag and username
   * @type {string}
   * @readonly
   */
  get clanTagAndUsername() {
    return this.clanTag ? `${this.clanTag} | ${this.username}` : this.username;
  }

  /**
   * Whether the player is online
   * @type {boolean}
   * @readonly
   */
  get online() {
    return this.lastOnlineTimestamp + 10 * 60 * 1000 > Date.now();
  }
}

module.exports = FriendRequestPlayer;
