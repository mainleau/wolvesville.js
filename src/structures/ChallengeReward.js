'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a challenge reward.
 * @extends {Base}
 */
class ChallengeReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward type
     * @type {number}
     */
    this.type = data.rewardInXp ? ItemTypes.XP : data.rewardInGems ? ItemTypes.GEM : ItemTypes.CARDS;

    /**
     * Reward amount
     * @type {number}
     */
    this.amount = data.rewardInXp || data.rewardInGems || data.rewardInCards;
  }
}

module.exports = ChallengeReward;
