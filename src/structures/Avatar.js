'use strict';

const Base = require('./Base');

/**
 * Represents an avatar.
 * @extends {Base}
 */
class Avatar extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Avatar id
     * @type {string}
     */
    this.id = data.renderedAvatarImage.fileName.slice(0, -4);

    /**
     * Avatar skin color
     * @type {number}
     */
    this.skinColor = parseInt(data.skinColor.slice(6)) - 1;

    /**
     * Avatar eyes
     * @type {AvatarItem}
     */
    this.eyes = this.client.items.avatarItems.cache.get(data.avatarEyesId);

    /**
     * Avatar clothes
     * @type {AvatarItem}
     */
    this.clothes = this.client.items.avatarItems.cache.get(data.avatarClothesBodyId);

    /**
     * Avatar gravestone
     * @type {AvatarItem}
     */
    this.gravestone = this.client.items.avatarItems.cache.get(data.gravestoneId);

    /**
     * Avatar hat
     * @type {?AvatarItem}
     */
    this.hat = this.client.items.avatarItems.cache.get(data.avatarHatId) || null;

    /**
     * Avatar hair
     * @type {?AvatarItem}
     */
    this.hair = this.client.items.avatarItems.cache.get(data.avatarHairId) || null;

    /**
     * Avatar glasses
     * @type {?AvatarItem}
     */
    this.glasses = this.client.items.avatarItems.cache.get(data.avatarGlassesId) || null;

    /**
     * Avatar mouth
     * @type {?AvatarItem}
     */
    this.mouth = this.client.items.avatarItems.cache.get(data.avatarMouthId) || null;

    /**
     * Avatar mask
     * @type {?AvatarItem}
     */
    this.mask = this.client.items.avatarItems.cache.get(data.avatarMaskId) || null;

    /**
     * Avatar badge
     * @type {?AvatarItem}
     */
    this.badge = this.client.items.avatarItems.cache.get(data.avatarBadgeId) || null;

    /**
     * Avatar foreground
     * @type {?AvatarItem}
     */
    this.foreground = this.client.items.avatarItems.cache.get(data.avatarFrontId) || null;

    /**
     * Avatar background
     * @type {?AvatarItem}
     */
    this.background = this.client.items.avatarItems.cache.get(data.avatarBackId) || null;
  }

  /**
  * Get avatar image url.
  * @returns {string}
  */
  imageURL({ zoom } = {}) {
    if (zoom && ![2, 3].includes(zoom)) throw new Error('INVALID_OPTION_VALUE');
    var url = `${this.client.options.http.cdn.avatars}/${this.id}`;
    if (zoom) url += `@${zoom}x`;

    return `${url}.png`;
  }
}

module.exports = Avatar;