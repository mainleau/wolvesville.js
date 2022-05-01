const Base = require('./Base');
const { RankedTiers } = require('../util/Constants');

/**
 * Represents a ranked award.
 * @extends {Base}
 */
class RankedAward extends Base {
  constructor(client, data) {
    super(client);
    /**
     * Required rank.
     * @type {number}
     */
    this.requiredRank = data.lastRank;

    /**
     * Award type.
     * @type {string}
     */
    this.type = data.itemType === 'COPPER' ? RankedTiers.PLATINUM
      : data.itemType === 'COPPER' ? RankedTiers.GOLD
      : data.itemType === 'COPPER' ? RankedTiers.SILVER
      : data.itemType === 'COPPER' ? RankedTiers.BRONZE
      : data.itemType === 'COPPER' ? RankedTiers.COPPER
      : RankedTiers.None;

  }
}

module.exports = RankedAward;
