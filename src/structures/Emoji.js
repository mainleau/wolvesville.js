const Base = require('./Base');

/**
 * Represents an emoji.
 * @extends {Base}
 */
class Emoji extends Base {
  constructor(client, data) {
    super(client);

    this.id = data.id;

    this.name = data.name;

    if(data.costInGems) {
      Object.defineProperty(this, 'cost', { value: data.costInGems });
    }

    Object.defineProperty(this, 'purchasable', { value: data.showInInventory & data.isPurchasable });

    Object.defineProperty(this, 'event', { value: data.event });
  }
}

module.exports = Emoji;
