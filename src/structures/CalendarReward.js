const Base = require('./Base');
const { RewardTypes } = require('../util/Constants');

/**
 * Represents a calendar reward.
 * @extends {Base}
 */
class CalendarReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward type.
     * @type {string}
     */
    this.type = data.type;

    /**
     * Reward amount.
     * @type {number}
     */
    this.amount = data.amount;

    this.item = this.type === RewardTypes.AVATAR_ITEM ? client.items.avatarItems.cache.get(data.avatarItemId)
      : this.type === RewardTypes.LOADING_SCREEN ? client.items.loadingScreens.cache.get(data.loadingScreenId)
      : this.type === RewardTypes.BACKGROUND ? client.items.backgrounds.cache.get(data.backgroundId)
      : client.items.emojis.cache.get(data.emojiId);

    /**
     * Reward day.
     * @type {number}
     */
    this.day = data.day;
  }
}

module.exports = CalendarReward;
