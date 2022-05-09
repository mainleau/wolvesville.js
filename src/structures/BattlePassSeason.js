'use strict';

const Base = require('./Base');
const BattlePassReward = require('./BattlePassReward.js');

/**
 * Represents a battle pass season.
 * @extends {Base}
 */
class BattlePassSeason extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Battle pass season
     * @type {number}
     */
    this.season = data.battlePassSeason.number + 1;

    /**
     * Xp done in battle pass
     * @type {number}
     */
    this.xp = data.battlePass.xp;

    /**
     * Wether battle pass claimed
     * @type {boolean}
     */
    this.claimed = data.battlePass.claimed;

    /**
     * Battle pass rewards
     * @type {BattlePassReward[]}
     */
    this.rewards = data.battlePassSeason.rewards.map(
      (reward, tier) =>
        new BattlePassReward(
          client,
          Object.assign(reward, {
            tier,
            claimed: data.battlePassSeason.rewards.indexOf(reward) <= this.tier,
          }),
        ),
    );

    /**
     * Battle pass xp required to complete a tier
     * @type {number}
     */
    this.tierXpRequired = data.battlePassSeason.xpPerReward;

    /**
     * Battle pass price in gold
     * @type {number}
     */
    this.price = data.battlePassSeason.goldPrice;

    /**
     * Battle pass price to skip tier
     * @type {number}
     */
    this.skipPrice = data.battlePassSeason.goldPricePerReward;

    /**
     * Season duration
     * @type {number}
     */
    this.duration = data.battlePassSeason.durationInDays;

    /**
     * Season start timestamp
     * @type {number}
     */
    this.startTimestamp = new Date(data.battlePassSeason.startTime).getTime();

    /**
     * Season end timestamp
     * @type {number}
     */
    this.endTimestamp = new Date(this.startTimestamp + this.duration * 24 * 60 * 60 * 1000).getTime();
  }

  /**
   * Battle pass tier
   * @type {number}
   * @readonly
   */
  get tier() {
    return (this.xp / this.tierXpRequired) | 0;
  }

  /**
   * Battle pass tier xp
   * @type {number}
   * @readonly
   */
  get progress() {
    return this.xp % this.tierXpRequired;
  }

  /**
   * Weather battle pass completed
   * @type {boolean}
   * @readonly
   */
  get completed() {
    return this.xp === this.tierXpRequired * 100;
  }
}

module.exports = BattlePassSeason;
