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

    /**
     * Emoji name
     * @type {string}
     */
    this.name = data.name;

    if (data.costInGems) {
      /**
       * Emoji cost
       * @type {number}
       */
      Object.defineProperty(this, 'cost', { value: data.costInGems });
    }

    /**
     * Whether emoji is purchasable
     * @type {boolean}
     */
    Object.defineProperty(this, 'purchasable', { value: data.showInInventory & data.isPurchasable });

    /**
     * Emoji event
     * @type {string}
     */
    Object.defineProperty(this, 'event', { value: data.event });
  }
}

module.exports = Emoji;
