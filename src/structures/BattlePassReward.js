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
     * Wether reward is claimed
     * @type {boolean}
     */
    this.claimed = data.claimed;

    /**
     * Reward type
     * @type {string}
     */
    this.type = RewardTypes[data.type];

    /**
     * Reward amount
     * @type {number}
     */
    this.amount = data.amount;

    console.log(data.type)

    if(data.avatarItemId || data.rosePackageId || data.emojiId || data.profileIconId) {
      /**
       * Reward item
       * @type {Object}
       */
      this.item = client.items.avatarItems.cache.get(data.avatarItemId)
        || client.items.rosePackages.cache.get(data.rosePackageId)
        || client.items.emojis.cache.get(data.emojiId)
        || client.items.profileIcons.cache.get(data.profileIconId);
    }
  }
}

module.exports = BattlePassReward;
