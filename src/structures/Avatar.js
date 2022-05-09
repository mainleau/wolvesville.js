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
}

module.exports = Avatar;
