'use strict';

const BasePlayer = require('./BasePlayer');

/**
 * Represents a custom game host.
 * @extends {BasePlayer}
 */
class CustomGameHost extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Host username
     * @type {string}
     */
    this.username = data.username;
  }
}

module.exports = CustomGameHost;
