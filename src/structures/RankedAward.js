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
     * Required rank
     * @type {number}
     */
    this.requiredRank = data.lastRank;

    /**
     * Award type
     * @type {string}
     */
    this.type = RankedTiers[data.itemType] || RankedTiers.NONE;
  }
}

module.exports = RankedAward;
