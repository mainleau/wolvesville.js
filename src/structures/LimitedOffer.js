'use strict';

const Base = require('./Base');
const Outfit = require('./Outfit');

/**
 * Represents a limited offer.
 * @extends {Base}
 */
class LimitedOffer extends Base {
  constructor(client, data) {
    super(client);

    this.type = data.type;
    this.outfit = new Outfit(client, data.itemSets[0]);
    this.expirationTimestamp = new Date(data.expireDate).getTime();
    this.giftable = data.canBeGifted;
  }
}

module.exports = LimitedOffer;
