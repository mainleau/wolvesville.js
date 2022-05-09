'use strict';

const Base = require('./Base');

/**
 * Represents an offer.
 * @extends {Base}
 */
class Offer extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Offer name
     * @type {string}
     */
    this.name = data.type;

    /**
     * Offer cost
     * @type {number}
     */
    this.cost = data.costInGems;
  }
}

module.exports = Offer;
