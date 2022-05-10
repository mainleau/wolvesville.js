'use strict';

const Offer = require('./Offer');
const Outfit = require('./Outfit');

/**
 * Represents a limited offer.
 * @extends {Offer}
 */
class LimitedOffer extends Offer {
  constructor(client, data) {
    super(client, data);

    /**
     * Offer cost
     * @type {Offer}
     */
    this.cost = client.items.offers.cache.get(this.name).cost;

    /**
     * Offer outfit
     * @type {Outfit}
     */
    this.outfit = new Outfit(client, data.itemSets[0]);

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

module.exports = LimitedOffer;
