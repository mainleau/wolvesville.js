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

    /**
     * Offer type
     * @type {string}
     */
    this.type = data.type;

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
     * Wether offer is giftable
     * @type {boolean}
     */
    this.giftable = data.canBeGifted;
  }
}

module.exports = LimitedOffer;
