'use strict';

const Base = require('./Base');

/**
 * Represents an offer.
 * @extends {Base}
 */
class Offer extends Base {
  constructor(client, data) {
    super(client);

    this._patch(data);
  }

  _patch(data) {
    if ('type' in data) {
      /**
       * Offer name
       * @type {?string}
       */
      this.name = data.type;
    } else {
      this.name ??= null;
    }

    if ('costInGems' in data) {
      /**
       * Offer cost
       * @type {?number}
       */
      this.cost = data.costInGems;
    } else {
      this.cost ??= null;
    }
  }
}

module.exports = Offer;
