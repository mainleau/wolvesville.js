'use strict';

const Base = require('./Base');
const { RewardTypes } = require('../util/Constants');

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
    this.type = data.rewardInXp ? RewardTypes.XP : data.rewardInGems ? RewardTypes.GEM : RewardTypes.CARDS;

    /**
     * Reward amount
     * @type {number}
     */
    this.amount = data.rewardInXp || data.rewardInGems || data.rewardInCards;
  }
}

module.exports = ChallengeReward;
