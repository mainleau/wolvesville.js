const Base = require('./Base');
const { ItemTypes, Rarities } = require('../util/Constants');

/**
 * Represents an avatar item.
 * @extends {Base}
 */
class AvatarItem extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Item id
     * @type {string}
     */
    this.id = data[0];

    /**
     * Item name
     * @type {string}
     */
    this.name = data[11];

    /**
     * Item type
     * @type {string}
     */
    this.type = data[8] === 2 ? ItemTypes.HAT
      : data[8] === 1 ? ItemTypes.HAIR
      : data[8] === 7 ? ItemTypes.EYES
      : data[8] === 3 ? ItemTypes.GLASSES
      : data[8] === 10 ? ItemTypes.MOUTH
      : data[8] === 9 ? ItemTypes.MASK
      : data[8] === 0 ? ItemTypes.CLOTHES
      : data[8] === 5 ? ItemTypes.FOREGROUND
      : data[8] === 6 ? ItemTypes.BACKGROUND
      : data[8] === 8 ? ItemTypes.BADGE
      : ItemTypes.GRAVESTONE;

    /**
     * Item rarity
     * @type {string}
     */
    this.rarity = data[1] === 0 ? Rarities.COMMON
      : data[1] === 1 ? Rarities.RARE
      : data[1] === 2 ? Rarities.EPIC
      : Rarities.LEGENDARY;

    if(data[2] !== -1 || data[3] !== -1 || data[4] !== -1) {
      /**
       * Item cost
       * @type {number}
       */
      Object.defineProperty(this, 'cost', { value:
        data[2] !== -1 ? data[2]
          : data[3] !== -1 ? data[3]
          : data[4]
      });
    }

    /**
     * Wether item is purchasable
     * @type {boolean}
     */
    Object.defineProperty(this, 'purchasable', { value: !!(data[5] & data[6]) });

    if(data[10] !== -1) {
      /**
       * Item required level
       * @type {number}
       */
      Object.defineProperty(this, 'requiredLevel', { value: data[10] });
    }
  }

  /**
   * Get item image url.
   * @returns {string}
   */
  imageURL({ large = false, zoom } = {}) {
    if(typeof large !== 'boolean') throw new Error('OPTION_VALUE_MUST_BE_A_BOOLEAN');
    if(zoom && ![2, 3].includes(zoom)) throw new Error('INVALID_OPTION_VALUE');

    var url = `${this.client.options.http.cdn}/avatarItems/${this.name}`;
    url += `.avatar-${large ? 'large' : 'small'}`;
    if(zoom) url += `@${zoom}x`;

    return `${url}.png`;
  }

}

module.exports = AvatarItem;
