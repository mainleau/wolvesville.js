'use strict';

const Base = require('./Base');

/**
 * Represents a gift.
 * @extends {Base}
 */
class Gift extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Gift type
     * @type {string}
     */
    this.type = data.description;

    /**
     * Gift pruchase timestamp
     * @type {number}
     */
    this.purchaseTimestamp = new Date(data.purchaseTime).getTime();
  }
}

module.exports = Gift;
