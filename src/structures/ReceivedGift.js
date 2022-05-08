const Gift = require('./Gift');
const GiftSender = require('./GiftSender');

/**
 * Represents a received gift.
 * @extends {Gift}
 */
class ReceivedGift extends Gift {
  constructor(client, data) {
    super(client, data);

    /**
     * Gift sender
     * @type {GiftSender}
     */
    this.sender = new GiftSender(client, data);
  }
}

module.exports = ReceivedGift;
