'use strict';

const BasePlayer = require('./BasePlayer');

/**
 * Represents a gift recipient.
 * @extends {BasePlayer}
 */
class GiftRecipient extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Recipient username.
     * @type {string}
     */
    this.username = data.recipientUsername;
  }
}

module.exports = GiftRecipient;
