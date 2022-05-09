'use strict';

const Base = require('./Base');

/**
 * Represents an outfit.
 * @extends {Base}
 */
class Outfit extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Outfit id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Outfit name
     * @type {string}
     */
    this.name = data.imageName;

    /**
     * Outfit items
     * @type {AvatarItem[]}
     */
    this.items = data.avatarItemIds.map(id => client.items.avatarItems.cache.get(id));

    /**
     * Outfit primary color
     * @type {string}
     */
    this.primaryColor = data.imagePrimaryColor;
  }

  /**
   * Outfit image url
   * @type {string}
   * @readonly
   */
  get imageURL() {
    return `${this.client.options.http.cdn}/promotions/${this.name}.jpg`;
  }
}

module.exports = Outfit;
