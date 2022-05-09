'use strict';

const Base = require('./Base');

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
    this.type = data.type;

    if (data.amount > 1) {
      /**
       * Reward amount
       * @type {?number}
       */
      this.amount = data.amount;
    }

    if (data.avatarItemId) {
      /**
       * Reward item id
       * @type {?string}
       */
      this.avatarItemId = data.avatarItemId;
    }
  }
}

module.exports = ClanQuestReward;
