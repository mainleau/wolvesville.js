'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a daily reward.
 * @extends {Base}
 */
class DailyReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward day
     * @type {number}
     */
    this.day = data.day;

    /**
     * Reward type
     * @type {string}
     */
    this.type = ItemTypes[data.type];

    if (this.type === ItemTypes.AVATAR_ITEM) {
      /**
       * Item id
       * @type {string}
       */
      this.item = client.items.avatarItems.cache.get(data.avatarItemId);
    }

    if ([ItemTypes.TALISMAN, ItemTypes.ROLE_CARD].includes(this.type)) {
      /**
       * Whether the item is unknown
       * @type {boolean}
       */
      this.unknown = data.unknown;
    }

    /**
     * Reward amount
     * @type {number}
     */
    this.amount = data.amount;

    /**
     * Whether the reward is claimed
     * @type {boolean}
     */
    this.claimed = data.claimed;
  }
}

module.exports = DailyReward;
