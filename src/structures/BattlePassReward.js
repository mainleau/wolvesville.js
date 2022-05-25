'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a battle pass reward.
 * @extends {Base}
 */
class BattlePassReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward tier
     * @type {number}
     */
    this.tier = data.tier;

    /**
     * Whether reward is claimed
     * @type {boolean}
     */
    this.claimed = data.claimed;

    /**
     * Reward type
     * @type {string}
     */
    this.type = ItemTypes[data.type];

    /**
     * Reward amount
     * @type {number}
     */
    this.amount = data.amount;

    if ([ItemTypes.AVATAR_ITEM, ItemTypes.PROFILE_ICON, ItemTypes.EMOJI, ItemTypes.ROSE_PACKAGE].includes(this.type)) {
      /**
       * Reward item
       * @type {AvatarItem|ProfileIcon|Emoji|RosePackage}
       */
      this.item = client.items.resolve(
        data.avatarItemId || data.rosePackageId || data.emojiId || data.profileIconId,
        this.type,
      );
    }
  }
}

module.exports = BattlePassReward;
