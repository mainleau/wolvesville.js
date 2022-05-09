'use strict';

const Base = require('./Base');

/**
 * Represents a talisman.
 * @extends {Base}
 */
class Talisman extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Talisman id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Talisman name
     * @type {string}
     */
    this.name = data.type;

    /**
     * Talisman cost
     * @type {number}
     */
    Object.defineProperty(this, 'cost', { value: data.costInSilver });
  }
}

module.exports = Talisman;
