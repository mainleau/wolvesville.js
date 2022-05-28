'use strict';

const Base = require('./Base');
const { Rarities } = require('../util/Constants');

/**
 * Represents a rose package.
 * @extends {Base}
 */
class RosePackage extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Package id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Package name
     * @type {string}
     */
    this.name = data.type;

    /**
     * Package rarity
     * @type {string}
     */
    this.rarity = Rarities[data.rarity];

    /**
     * Talisman cost
     * @type {number}
     */
    this.cost = data.costInSilver;
  }
}

module.exports = RosePackage;
