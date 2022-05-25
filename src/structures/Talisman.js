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

    this._patch(data);
  }

  _patch(data) {
    if ('type' in data) {
      /**
       * Talisman name
       * @type {string}
       */
      this.name = data.type;
    } else {
      this.name ??= null;
    }

    if ('costInSilver' in data) {
      /**
       * Talisman cost
       * @type {number}
       */
      this.cost = data.costInSilver;
    } else {
      this.cost ??= null;
    }
  }
}

module.exports = Talisman;
