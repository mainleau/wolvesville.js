'use strict';

const Base = require('./Base');
const { Rarities } = require('../util/Constants');

/**
 * Represents a loading screen.
 * @extends {Base}
 */
class LoadingScreen extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Loading screen id
     * @type {string}
     */
    this.id = data.id;

    this._patch(data);
  }

  _patch(data) {
    if ('name' in data) {
      /**
       * Loading screen name
       * @type {?string}
       */
      this.name = data.name;
    } else {
      this.name ??= null;
    }

    if ('rarity' in data) {
      /**
       * Loading screen rarity
       * @type {?string}
       */
      this.rarity = Rarities[data.rarity];
    } else {
      this.rarity ??= null;
    }

    if ('accentColor' in data) {
      /**
       * Loading screen accent color
       * @type {?string}
       */
      this.accentColor = data.accentColor;
    } else {
      this.accentColor ??= null;
    }
  }

  /**
   * Get loading screen image url.
   * @returns {string}
   */
  imageURL({ wide = false, zoom } = {}) {
    if (!this.name) throw new Error('ITEMS_NOT_FETCHED');
    if (typeof wide !== 'boolean') throw new Error('OPTION_VALUE_MUST_BE_A_BOOLEAN');
    if (zoom && ![2, 3].includes(zoom)) throw new Error('INVALID_OPTION_VALUE');

    var url = `${this.client.rest.options.cdn.items}/loadingScreens/${this.name}`;
    url += `_background_large${wide ? '.wide' : ''}`;
    if (zoom) url += `@${zoom}x`;

    return `${url}.png`;
  }
}

module.exports = LoadingScreen;
