'use strict';

const Gift = require('./Gift');
const GiftRecipient = require('./GiftRecipient');

/**
 * Represents a sent gift.
 * @extends {Gift}
 */
class SentGift extends Gift {
  constructor(client, data) {
    super(client, data);

    /**
     * Gift recipient
     * @type {GiftRecipient}
     */
    this.recipient = new GiftRecipient(client, data);
  }
}

module.exports = SentGift;
