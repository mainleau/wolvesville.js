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

    /**
     * Offer type
     * @type {string}
     */
    this.type = data.type;

    /**
     * Offer outfits
     * @type {Outfit[]}
     */
    this.outfits = data.itemSets.map(outfit => new Outfit(client, outfit));

    /**
     * Offer expiration timestamp
     * @type {number}
     */
    this.expirationTimestamp = new Date(data.expireDate).getTime();

    /**
     * Wether offer is giftable
     * @type {string}
     */
    this.giftable = data.canBeGifted;
  }
}

module.exports = LimitedCollection;
