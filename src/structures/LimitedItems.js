'use strict';

const Base = require('./Base');

/**
 * Represents limited items.
 * @extends {Base}
 */
class LimitedItems extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Offer type
     * @type {string}
     */
    this.type = data.type;

    /**
     * Offer items
     * @type {AvatarItem[]}
     */
    this.items = data.avatarItemIds.map(id => client.items.avatarItems.cache.get(id));

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

module.exports = LimitedItems;
