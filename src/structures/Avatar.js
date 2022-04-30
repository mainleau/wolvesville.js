const Base = require('./Base');

/**
 * Represents an avatar.
 * @extends {Base}
 */
class Avatar extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Avatar skin color.
     * @type {string}
     */
    this.skinColor = parseInt(data.skinColor.slice(6)) - 1;

    /**
     * Avatar eyes id.
     * @type {string}
     */
    this.eyes = data.avatarEyesId;

    /**
     * Avatar clothes id.
     * @type {string}
     */
    this.clothes = data.avatarClothesBodyId;

    /**
     * Avatar gravestone id.
     * @type {string}
     */
    this.gravestone = data.gravestoneId;

    /**
     * Avatar hat id.
     * @type {?string}
     */
    this.hat = data.avatarHatId ? data.avatarHatId : null;

    /**
     * Avatar hair id.
     * @type {?string}
     */
    this.hair = data.avatarHairId ? data.avatarHairId : null;

    /**
     * Avatar glasses id.
     * @type {?string}
     */
    this.glasses = data.avatarGlassesId ?  data.avatarGlassesId : null;

    /**
     * Avatar mouth id.
     * @type {?string}
     */
    this.mouth = data.avatarMouthId ? data.avatarMouthId : null;

    /**
     * Avatar mask id.
     * @type {?string}
     */
    this.mask = data.avatarMaskId ? data.avatarMaskId : null;

    /**
     * Avatar badge id.
     * @type {?string}
     */
    this.badge = data.avatarBadgeId ? data.avatarBadgeId : null;

    /**
     * Avatar foreground id.
     * @type {?string}
     */
    this.foreground = data.avatarFrontId ? data.avatarFrontId : null;

    /**
     * Avatar background id.
     * @type {?string}
     */
    this.background = data.avatarBackId ? data.avatarBackId : null;
  }
}

module.exports = Avatar;
