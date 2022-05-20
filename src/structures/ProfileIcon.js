'use strict';

const Base = require('./Base');
const { Rarities } = require('../util/Constants');

/**
 * Represents a profile icon.
 * @extends {Base}
 */
class ProfileIcon extends Base {
  constructor(client, data) {
    super(client);

    this._patch(data);
  }

  _patch(data) {
    if ('id' in data) {
      /**
       * Profile icon id
       * @type {string}
       */
      this.id = data.id;
    } else {
      this.id ??= null;
    }

    if ('name' in data) {
      /**
       * Profile icon name
       * @type {string}
       */
      this.name = data.name.split(':')[1];
    } else {
      this.name ??= null;
    }

    if ('rarity' in data) {
      /**
       * Profile icon rarity
       * @type {string}
       */
      this.rarity = Rarities[data.rarity];
    } else {
      this.rarity ??= null;
    }

    if ('event' in data) {
      /**
       * Profile icon event
       * @type {string}
       */
      this.event = data.event;
    }

    if (('costInSilver' in data && data.costInSilver !== -1) || ('costInRoses' in data && data.costInRoses !== -1)) {
      /**
       * Profile icon cost
       * @type {number}
       */
      this.cost = data.costInSilver !== -1 ? data.costInSilver : data.costInRoses;
    } else {
      this.cost ??= null;
    }

    if ('isPurchasable' in data || 'showInInventory' in data) {
      /**
       * Whether profile icon is purchasable
       * @type {string}
       */
      this.purchasable = Boolean(data.isPurchasable & data.showInInventory);
    }
  }
}

module.exports = ProfileIcon;
