'use strict';

const Base = require('./Base');
const { RewardTypes } = require('../util/Constants');

/**
 * Represents a golden wheel reward.
 * @extends {Base}
 */
class GoldenWheelReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward type
     * @type {string}
     */
    this.type = data.type.startsWith('SILVER') ? RewardTypes.GOLD : data.type;

    /**
     * Reward amount
     * @type {number}
     */
    this.amount = data.silver;

    if (data.avatarItemId || data.profileIconId) {
      /**
       * Reward item id
       * @type {AvatarItem|ProfileIcon}
       */
      this.item =
        client.items.avatarItems.cache.get(data.avatarItemId) ||
        client.items.profileIcons.cache.get(data.profileIconId);
    }
  }
}

module.exports = GoldenWheelReward;
