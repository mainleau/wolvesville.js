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

    /**
     * Loading screen name
     * @type {string}
     */
    this.name = data.imageStore.fileName.split('_').slice(0, -1).join('_');

    /**
     * Loading screen name
     * @type {string}
     */
    this.rarity = Rarities[data.rarity];

    /**
     * Loading screen primary color
     * @type {string}
     */
    Object.defineProperty(this, 'primaryColor', { value: data.imagePrimaryColor });
  }

  /**
   * Get loading screen image url.
   * @returns {string}
   */
  imageURL({ wide = false, zoom } = {}) {
    if(typeof wide !== 'boolean') throw new Error('OPTION_VALUE_MUST_BE_A_BOOLEAN');
    if(zoom && ![2, 3].includes(zoom)) throw new Error('INVALID_OPTION_VALUE');

    var url = `${this.client.options.http.cdn}/loadingScreens/${this.name}`;
    url += `_background_large${wide ? '.wide' : ''}`;
    if(zoom) url += `@${zoom}x`;

    return `${url}.png`;
  }

}

module.exports = LoadingScreen;
