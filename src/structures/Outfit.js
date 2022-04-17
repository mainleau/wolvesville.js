const Base = require('./Base');

/**
 * Represents an outfit.
 * @extends {Base}
 */
class Outfit extends Base {
  constructor(client, data) {
    super(client);

    this.id = data.id;
    this.name = data.imageName;
    this.items = data.avatarItemIds.map(id => client.items.get(id));
    this.primaryColor = data.imagePrimaryColor;
  }

  /**
   * Outfit image url.
   * @returns {string}
   * @readonly
   */
  get imageURL() {
    return `${this.client.options.http.cdn}/promotions/${this.name}.jpg`;
  }
}

module.exports = Outfit;
