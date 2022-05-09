'use strict';

const Base = require('./Base');
const Outfit = require('./Outfit');

/**
 * Represents a limited collection.
 * @extends {Base}
 */
class LimitedCollection extends Base {
  constructor(client, data) {
    super(client);

    this.type = data.type;
    this.outfits = data.itemSets.map(outfit => new Outfit(client, outfit));
    this.expirationTimestamp = new Date(data.expireDate).getTime();
    this.giftable = data.canBeGifted;
  }
}

module.exports = LimitedCollection;
