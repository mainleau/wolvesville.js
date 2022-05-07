const Base = require('./Base');
const { ItemRarities } = require('../util/Constants');

/**
 * Represents a profile icon.
 * @extends {Base}
 */
class ProfileIcon extends Base {
  constructor(client, data) {
    super(client);

    this.id = data.id;

    this.name = data.name.split(':')[1];

    this.rarity = data.rarity === 'COMMON' ? ItemRarities.COMMON
      : data.rarity === 'RARE' ? ItemRarities.RARE
      : data.rarity === 'EPIC' ? ItemRarities.EPIC
      : ItemRarities.LEGENDARY;

    if(data.costInSilver !== -1 || data.costInRoses !== -1) {
      Object.defineProperty(this, 'cost', {
        value: data.costInSilver !== -1 ? data.costInSilver : data.costInRoses
      });
    }

    Object.defineProperty(this, 'purchasable', {
      value: data.isPurchasable & data.showInInventory
    });

    if(data.event) {
      Object.defineProperty(this, 'event', { value: data.event });
    }
  }
}

module.exports = ProfileIcon;
