'use strict';

const BasePlayer = require('./BasePlayer');

/**
 * Represents a gift sender.
 * @extends {BasePlayer}
 */
class GiftSender extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Sender username.
     * @type {string}
     */
    this.username = data.senderUsername;
  }
}

module.exports = GiftSender;
