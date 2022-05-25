'use strict';

const Offer = require('./Offer');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a limited items offer.
 * @extends {Offer}
 */
class LimitedItemsOffer extends Offer {
  constructor(client, data) {
    super(client, data);

    /**
     * Offer items
     * @type {AvatarItem[]|Emoji[]}
     */
    this.items =
      data.avatarItemIds?.map(id => client.items.resolve(id, ItemTypes.AVATAR_ITEM)) ||
      data.emojiIds?.map(id => client.items.resolve(id, ItemTypes.EMOJI));

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

module.exports = LimitedItemsOffer;
