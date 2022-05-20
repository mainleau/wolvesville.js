'use strict';

const Base = require('./Base');
const { AvatarItemTypes, Rarities } = require('../util/Constants');

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

    this._patch(data);
  }

  _patch(data) {

    if(11 in data) {
      /**
       * Item name
       * @type {string}
       */
      this.name = data[11];
    } else {
      this.name ??= null;
    }

    if(8 in data) {
      /**
       * Item type
       * @type {string}
       */
      this.type =
        data[8] === 2
          ? AvatarItemTypes.HAT
          : data[8] === 1
          ? AvatarItemTypes.HAIR
          : data[8] === 7
          ? AvatarItemTypes.EYES
          : data[8] === 3
          ? AvatarItemTypes.GLASSES
          : data[8] === 10
          ? AvatarItemTypes.MOUTH
          : data[8] === 9
          ? AvatarItemTypes.MASK
          : data[8] === 0
          ? AvatarItemTypes.CLOTHES
          : data[8] === 5
          ? AvatarItemTypes.FOREGROUND
          : data[8] === 6
          ? AvatarItemTypes.BACKGROUND
          : data[8] === 8
          ? AvatarItemTypes.BADGE
          : AvatarItemTypes.GRAVESTONE;
    } else {
      this.type ??= null;
    }

    if(1 in data) {
      /**
       * Item rarity
       * @type {string}
       */
      this.rarity =
        data[1] === 0
          ? Rarities.COMMON
          : data[1] === 1
          ? Rarities.RARE
          : data[1] === 2
          ? Rarities.EPIC
          : Rarities.LEGENDARY;
    } else {
      this.rarity ??= null;
    }

    if ((2 in data && data[2] !== -1) || (3 in data && data[3] !== -1) || (4 in data && data[4] !== -1)) {
      /**
       * Item cost
       * @type {number}
       */
      this.cost = data[2] !== -1 ? data[2] : data[3] !== -1 ? data[3] : data[4];
    } else {
      this.cost ??= null;
    }

    if(5 in data && 6 in data) {
      /**
       * Whether item is purchasable
       * @type {boolean}
       */
      this.purchasable = Boolean(data[5] & data[6]);
    } else {
      this.purchasable ??= null;
    }

    if (10 in data && data[10] !== -1) {
      /**
       * Item required level
       * @type {number}
       */
      this.requiredLevel = data[10];
    } else {
      this.requiredLevel ??= null;
    }
  }

  /**
   * Get item image url.
   * @returns {string}
   */
  imageURL({ large = false, zoom } = {}) {
    if (typeof large !== 'boolean') throw new Error('OPTION_VALUE_MUST_BE_A_BOOLEAN');
    if (zoom && ![2, 3].includes(zoom)) throw new Error('INVALID_OPTION_VALUE');

    var url = `${this.client.rest.options.cdn.items}/avatarItems/${this.name}`;
    url += `.avatar-${large ? 'large' : 'small'}`;
    if (zoom) url += `@${zoom}x`;

    return `${url}.png`;
  }
}

module.exports = AvatarItem;
