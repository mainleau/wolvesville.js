'use strict';

const Base = require('./Base');
const { Rarities } = require('../util/Constants');

/**
 * Represents a background.
 * @extends {Base}
 */
class Background extends Base {
  constructor(client, data) {
    super(client);

    this._patch(data);
  }

  _patch(data) {
    if ('id' in data) {
      /**
       * Background id
       * @type {string}
       */
      this.id = data.id;
    } else {
      this.id ??= null;
    }

    if ('name' in data) {
      /**
       * Background name
       * @type {?string}
       */
      this.name = data.name;
    } else {
      this.name ??= null;
    }

    if ('rarity' in data) {
      /**
       * Background rarity
       * @type {?string}
       */
      this.rarity = Rarities[data.rarity];
    } else {
      this.rarity ??= null;
    }

    if ('dayColor' in data) {
      /**
       * Background day color
       * @type {?string}
       */
      this.dayColor = data.dayColor;
    } else {
      this.dayColor ??= null;
    }

    if ('nightColor' in data) {
      /**
       * Background night color
       * @type {?string}
       */
      this.nightColor = data.nightColor;
    } else {
      this.nightColor ??= null;
    }
  }

  /**
   * Get background image url.
   * @returns {string}
   */
  imageURL({ night = false, large = false, zoom } = {}) {
    if (!this.name) throw new Error('ITEMS_NOT_FETCHED');
    if (typeof large !== 'boolean' || typeof night !== 'boolean') {
      throw new Error('OPTION_VALUE_MUST_BE_A_BOOLEAN');
    }
    if (zoom && ![2, 3].includes(zoom)) throw new Error('INVALID_OPTION_VALUE');

    var url = `${this.client.rest.options.cdn.items}/backgrounds/${this.name}`;
    url += `_background_${large ? 'large' : 'small'}`;
    url += `_${night ? 'night' : 'day'}`;
    if (zoom) url += `@${zoom}x`;

    return `${url}.png`;
  }
}

module.exports = Background;
