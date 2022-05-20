'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents an avatar.
 * @extends {Base}
 */
class Avatar extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Avatar id
     * @type {?string}
     */
    this.id = data.id;

    /**
     * Avatar skin color
     * @type {?number}
     */
    this.skinColor = data.skinColor;

    this._patch(data);
  }

  _patch(data) {
    if ('avatarHairId' in data) {
      /**
       * Avatar hair
       * @type {?AvatarItem}
       */
      this.hair = this.client.items.resolve(data.avatarHairId, ItemTypes.AVATAR_ITEM);
    } else {
      this.hair ??= null;
    }

    if ('avatarHatId' in data) {
      /**
       * Avatar hat
       * @type {?AvatarItem}
       */
      this.hat = this.client.items.resolve(data.avatarHatId, ItemTypes.AVATAR_ITEM);
    } else {
      this.hat ??= null;
    }

    if ('avatarEyesId' in data) {
      /**
       * Avatar eyes
       * @type {?AvatarItem}
       */
      this.eyes = this.client.items.resolve(data.avatarEyesId, ItemTypes.AVATAR_ITEM);
    } else {
      this.eyes ??= null;
    }

    if ('avatarGlassesId' in data) {
      /**
       * Avatar glasses
       * @type {?AvatarItem}
       */
      this.glasses = this.client.items.resolve(data.avatarGlassesId, ItemTypes.AVATAR_ITEM);
    } else {
      this.glasses ??= null;
    }

    if ('avatarMouthId' in data) {
      /**
       * Avatar mouth
       * @type {?AvatarItem}
       */
      this.mouth = this.client.items.resolve(data.avatarMouthId, ItemTypes.AVATAR_ITEM);
    } else {
      this.mouth ??= null;
    }

    if ('avatarMaskId' in data) {
      /**
       * Avatar mask
       * @type {?AvatarItem}
       */
      this.mask = this.client.items.resolve(data.avatarMaskId, ItemTypes.AVATAR_ITEM);
    } else {
      this.mask ??= null;
    }

    if ('avatarClothesBodyId' in data) {
      /**
       * Avatar clothes
       * @type {?AvatarItem}
       */
      this.clothes = this.client.items.resolve(data.avatarClothesBodyId, ItemTypes.AVATAR_ITEM);
    } else {
      this.clothes ??= null;
    }

    if ('avatarFrontId' in data) {
      /**
       * Avatar foreground
       * @type {?AvatarItem}
       */
      this.foreground = this.client.items.resolve(data.avatarFrontId, ItemTypes.AVATAR_ITEM);
    } else {
      this.foreground ??= null;
    }

    if ('avatarBackId' in data) {
      /**
       * Avatar background
       * @type {?AvatarItem}
       */
      this.background = this.client.items.resolve(data.avatarBackId, ItemTypes.AVATAR_ITEM);
    } else {
      this.background ??= null;
    }

    if ('avatarBadgeId' in data) {
      /**
       * Avatar badge
       * @type {?AvatarItem}
       */
      this.badge = this.client.items.resolve(data.avatarBadgeId, ItemTypes.AVATAR_ITEM);
    } else {
      this.badge ??= null;
    }

    if ('gravestoneId' in data) {
      /**
       * Avatar gravestone
       * @type {?AvatarItem}
       */
      this.gravestone = this.client.items.resolve(data.gravestoneId, ItemTypes.AVATAR_ITEM);
    } else {
      this.gravestone ??= null;
    }
  }

  /**
   * Get avatar image url.
   * @returns {string}
   */
  imageURL({ zoom } = {}) {
    if (zoom && ![2, 3].includes(zoom)) throw new Error('INVALID_OPTION_VALUE');
    var url = `${this.client.rest.options.cdn.avatars}/${this.id}`;
    if (zoom) url += `@${zoom}x`;

    return `${url}.png`;
  }
}

module.exports = Avatar;
