'use strict';

const Base = require('./Base');

/**
 * Represents a friend referral reward.
 * @extends {Base}
 */
class FriendReferralReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward type.
     * @type {string}
     */
    this.type = data.type;

    if (data.amount > 1) {
      /**
       * Reward amount.
       * @type {number}
       */
      this.amount = data.amount;
    }

    if (data.avatarItemId) {
      /**
       * Reward item id.
       * @type {Object}
       */
      this.item = { id: data.avatarItemId };
    }

    /**
     * Wether reward is claimed.
     * @type {boolean}
     */
    this.claimed = data.claimed;
  }
}

module.exports = FriendReferralReward;
