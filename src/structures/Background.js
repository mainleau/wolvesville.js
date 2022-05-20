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

    /**
     * Background id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Background name
     * @type {string}
     */
    this.name = data.imageStoreDay.fileName.split('_').slice(0, -3).join('_');

    /**
     * Background rarity
     * @type {string}
     */
    this.rarity = Rarities[data.rarity];

    /**
     * Background day color
     * @type {string}
     */
    Object.defineProperty(this, 'dayColor', { value: data.backgroundColorDay });

    /**
     * Background night color
     * @type {string}
     */
    Object.defineProperty(this, 'nightColor', { value: data.backgroundColorNight });
  }

  /**
   * Get background image url.
   * @returns {string}
   */
  imageURL({ night = false, large = false, zoom } = {}) {
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
