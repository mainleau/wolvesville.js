'use strict';

const Offer = require('./Offer');
const Outfit = require('./Outfit');

/**
 * Represents a limited collection.
 * @extends {Offer}
 */
class LimitedCollection extends Offer {
  constructor(client, data) {
    super(client, data);

    /**
     * Offer cost
     * @type {number}
     */
    this.cost = client.items.offers.cache.get(this.name).cost;

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
     * Whether offer is giftable
     * @type {boolean}
     */
    this.giftable = data.canBeGifted;
  }
}

module.exports = LimitedCollection;
