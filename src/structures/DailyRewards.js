'use strict';

const Base = require('./Base');
const DailyReward = require('./DailyReward');

/**
 * Represents daily rewards.
 * @extends {Base}
 */
class DailyRewards extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Daily rewards offset.
     * @type {number}
     */
    this.offset = data.offset;

    /**
     * Daily rewards.
     * @type {Collection<DailyReward>}
     */
    this.rewards = data.rewards.map((reward, index) => {
      reward.day = this.offset + index;
      return new DailyReward(client, reward);
    });

    /**
     * Daily rewards claim timestamp.
     * @type {number}
     */
    this.claimTimestamp = new Date(data.rewards.find(reward => reward.canBeClaimedDate).canBeClaimedDate).getTime();

    /**
     * Are daily rewards active.
     * @type {boolean}
     */
    this.active = !data.recentGameWinRequired;
  }

  /**
   * Next daily reward.
   * @type {DailyReward}
   * @readonly
   */
  get next() {
    return this.rewards.find(reward => reward.claimed === false);
  }

  /**
   * Wether next daily reward claimable.
   * @type {boolean}
   * @readonly
   */
  get available() {
    return this.active && Date.now() > this.claimTimestamp;
  }
}

module.exports = DailyRewards;
