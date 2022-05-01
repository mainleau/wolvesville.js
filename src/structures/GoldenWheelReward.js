const Base = require('./Base');

/**
 * Represents a golden wheel reward.
 * @extends {Base}
 */
class GoldenWheelReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward type.
     * @type {string}
     */
    this.type = data.type.startsWith('SILVER') ? 'GOLD' : data.type;

    if(data.silver) {
      /**
       * Reward amount.
       * @type {number}
       */
      this.amount = data.silver;
    }

    if(data.avatarItemId || data.profileIconId) {
      /**
       * Reward item id.
       * @type {Object}
       */
      this.item = { id: data.avatarItemId || data.profileIconId };
    }
  }
}

module.exports = GoldenWheelReward;
