const Base = require('./Base');

/**
 * Represents an avatar item.
 * @extends {Base}
 */
class AvatarItem extends Base {
  constructor(client, data) {
    super(client);

    this.id = data.id;

    this.name = data.storeImage.fileName.split('.').slice(0, -2).join('.');

    this.type = data.type;

    this.rarity = data.rarity;

    if(data.costInSilver !== -1 || data.costInRoses !== -1 || data.costInGems !== -1) {
      this.cost = data.costInSilver !== -1 ? data.costInSilver
        : data.costInRoses !== -1 ? data.costInRoses
        : data.costInGems;
    }

    this.purchasable = !!(data.isPurchasable & data.showInInventory);

    if(data.minLevel !== -1) this.requiredLevel = data.minLevel;

  }

  get smallImageURL() {
    return `${this.client.options.http.cdn}/avatarItems/${this.name}.avatar-small.png`;
  }

  get largeImageURL() {
    return `${this.client.options.http.cdn}/avatarItems/${this.name}.avatar-large.png`
  }

}

module.exports = AvatarItem;
