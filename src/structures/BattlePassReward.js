const Base = require('./Base');
const { RewardTypes } = require('../util/Constants');

/**
 * Represents a battle pass reward.
 * @extends {Base}
 */
class BattlePassReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward tier.
     * @type {number}
     */
    this.tier = data.tier;

    /**
     * Is reward claimed.
     * @type {boolean}
     */
    this.claimed = data.claimed;

    /**
     * Reward type.
     * @type {string}
     */
    this.type = data.type === 'AVATAR_ITEM' ? RewardTypes.AVATAR_ITEM
      : data.type === 'PROFILE_ICON' ? RewardTypes.PROFILE_ICON
      : data.type === 'ROSE_PACKAGE' ? RewardTypes.ROSE_PACKAGE
      : data.type === 'GOLD' ? RewardTypes.GOLD
      : data.type === 'GEM' ? RewardTypes.GEM
      : data.type === 'EMOJI' ? RewardTypes.EMOJI
      : data.type === 'LOADING_SCREEN' ? RewardTypes.LOADING_SCREEN
      : RewardTypes.LOOTBOX;


    /**
     * Reward amount.
     * @type {number}
     */
    this.amount = data.amount;

    if(data.avatarItemId || data.rosePackageId || data.emojiId || data.profileIconId) {
      /**
       * Reward item id.
       * @type {Object}
       */
      this.item = { id: data.avatarItemId || data.rosePackageId || data.emojiId || data.profileIconId }
    }
  }
}

module.exports = BattlePassReward;
