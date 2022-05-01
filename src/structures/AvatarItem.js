const Base = require('./Base');
const { ItemTypes, ItemRarities } = require('../util/Constants');

/**
 * Represents an avatar item.
 * @extends {Base}
 */
class AvatarItem extends Base {
  constructor(client, data) {
    super(client);

    this.id = data.id;

    this.name = data.storeImage.fileName.split('.').slice(0, -2).join('.');

    this.type = data.type === 'HAT' ? ItemTypes.HAT
      : data.type === 'HAIR' ? ItemTypes.HAIR
      : data.type === 'EYES' ? ItemTypes.EYES
      : data.type === 'GLASSES' ? ItemTypes.GLASSES
      : data.type === 'MOUTH' ? ItemTypes.MOUTH
      : data.type === 'MASK' ? ItemTypes.MASK
      : data.type === 'CLOTHES_BODY' ? ItemTypes.CLOTHES
      : data.type === 'FRONT' ? ItemTypes.FOREGROUND
      : data.type === 'BACK' ? ItemTypes.BACKGROUND
      : data.type === 'BADGE' ? ItemTypes.BADGE
      : ItemTypes.GRAVESTONE;

    this.rarity = data.rarity === 'COMMON' ? ItemRarities.COMMON
      : data.rarity === 'RARE' ? ItemRarities.RARE
      : data.rarity === 'EPIC' ? ItemRarities.RARE
      : ItemRarities.LEGENDARY;

    if(data.costInSilver !== -1 || data.costInRoses !== -1 || data.costInGems !== -1) {
      Object.defineProperty(this, 'cost', { value:
        data.costInSilver !== -1 ? data.costInSilver
          : data.costInRoses !== -1 ? data.costInRoses
          : data.costInGems
      });
    }

    Object.defineProperty(this, 'purchasable', { value: !!(data.isPurchasable & data.showInInventory) });

    if(data.minLevel !== -1) {
      Object.defineProperty(this, 'requiredLevel', { value: data.minLevel });
    }
  }

  get smallImageURL() {
    return `${this.client.options.http.cdn}/avatarItems/${this.name}.avatar-small.png`;
  }

  get largeImageURL() {
    return `${this.client.options.http.cdn}/avatarItems/${this.name}.avatar-large.png`
  }

}

module.exports = AvatarItem;
