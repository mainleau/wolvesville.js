'use strict';

const Base = require('./Base');

/**
 * Represents a base player.
 * @extends {Base}
 */
class BasePlayer extends Base {
  /**
   * Fetch the player.
   * @returns {Player|ClientPlayer}
   */
  fetch() {
    if (this.id) {
      return this.client.players.fetchById(this.id);
    } else if (this.username) {
      return this.client.players.fetchByUsername(this.username);
    } else {
      throw new Error('PLAYER_NOT_FOUND');
    }
  }
}

module.exports = BasePlayer;
