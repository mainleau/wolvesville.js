'use strict';

const Base = require('./Base');

/**
 * Represents an emoji.
 * @extends {Base}
 */
class Emoji extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Emoji id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('name' in data) {
      /**
       * Emoji name
       * @type {?string}
       */
      this.name = data.name;
    } else {
      this.name ??= null;
    }

    if ('event' in data) {
      /**
       * Emoji event
       * @type {?string}
       */
      this.event = data.event;
    } else {
      this.event ??= null;
    }

    if ('costInGems' in data && data.costInGems !== -1) {
      /**
       * Emoji cost
       * @type {?number}
       */
      this.cost = data.costInGems;
    } else {
      this.cost ??= null;
    }

    if ('showInInventory' in data && 'isPurchasable' in data) {
      /**
       * Whether emoji is purchasable
       * @type {?boolean}
       */
      this.purchasable = Boolean(data.showInInventory & data.isPurchasable);
    } else {
      this.purchasable ??= null;
    }
  }
}

module.exports = Emoji;
