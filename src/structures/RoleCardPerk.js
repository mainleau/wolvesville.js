'use strict';

const Base = require('./Base');

/**
 * Represents a role card perk.
 * @extends {Base}
 */
class RoleCardPerk extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Perk id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Perk tier
     * @type {number}
     */
    this.tier = data.tier;

    if (data.effectValue !== -1) {
      /**
       * Perk efficiency
       * @type {number}
       */
      this.efficiency = data.effectValue;
    }
  }
}

module.exports = RoleCardPerk;
