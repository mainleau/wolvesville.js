'use strict';

const BasePlayer = require('./BasePlayer');

/**
 * Represents a player of a clan log.
 * @extends {BasePlayer}
 */
class ClanLogPlayer extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Field player.
     * @type {string}
     */
    this.username = data.username;
  }
}

module.exports = ClanLogPlayer;
