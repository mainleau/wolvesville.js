'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a clan quest reward.
 * @extends {Base}
 */
class ClanQuestReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward type
     * @type {string}
     */
    this.type = ItemTypes[data.type];

    /**
     * Reward amount
     * @type {?number}
     */
    this.amount = data.amount;

    if (this.type === ItemTypes.AVATAR_ITEM) {
      /**
       * Reward item id
       * @type {AvatarItem}
       */
      this.item = client.items.resolve(data.avatarItemId, ItemTypes.AVATAR_ITEM);
    }
  }
}

module.exports = ClanQuestReward;
