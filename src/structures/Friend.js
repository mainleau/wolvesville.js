'use strict';

const BasePlayer = require('./BasePlayer');

/**
 * Represents a friend.
 * @extends {BasePlayer}
 */
class Friend extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Friend id.
     * @type {string}
     */
    this.id = data.id;

    /**
     * Friend username.
     * @type {string}
     */
    this.username = data.username;

    /**
     * Friend level.
     * @type {number}
     */
    this.level = data.level;

    /**
     * Friend last online timestamp.
     * @type {number}
     */
    this.lastOnlineTimestamp = new Date(data.lastOnline).getTime();

    /**
     * Friend profile icon.
     * @type {Object}
     */
    this.profileIcon = {
      id: data.profileIconId,
      color: data.profileIconColor,
    };

    /**
     * Friend clan tag.
     * @type {?string}
     */
    this.clanTag = data.clanTag || null;

    /**
     * Friend status.
     * @type {string}
     */
    this.status = data.playerStatus;

    /**
     * Is a favourite friend.
     * @type {boolean}
     */
    this.favourite = data.favourite;
  }

  get online() {
    return this.lastOnlineTimestamp + 10 * 60 * 1000 > Date.now();
  }
}

module.exports = Friend;
