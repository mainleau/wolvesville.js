const Base = require('./Base');
const Lootbox = require('./Lootbox');

/**
 * Represents an inventory.
 * @extends {Base}
 */
class Inventory extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Gold count.
     * @type {number}
     */
    this.goldCount = data.silverCount;

    /**
     * Rose count.
     * @type {number}
     */
    this.roseCount = data.roseCount;

    /**
     * Gem count.
     * @type {number}
     */
    this.gemCount = data.gemCount;

    /**
     * Loyalty token count.
     * @type {number}
     */
    this.loyaltyTokenCount = data.loyaltyTokenCount;

    /**
     * Avatar items.
     * @type {Array}
     */
    this.avatarItems = data.avatarItemIds;

    /**
     * Player icons.
     * @type {Array}
     */
    this.icons = data.ownedProfileIcons.map(icon => icon.profileIconId);

    /**
     * Backgrounds.
     * @type {Array}
     */
    this.backgrounds = data.ownedBackgroundIds;

    /**
     * Loading screens.
     * @type {Array}
     */
    this.loadingScreens = data.ownedLoadingScreenIds;

    /**
     * Emojis.
     * @type {Array}
     */
    this.emojis = data.ownedEmojis;

    /**
     * Taslismans.
     * @type {Array}
     */
    this.talismans = data.ownedTalismans;

    /**
     * Lootboxes.
     * @type {Array}
     */
    this.lootboxes = data.lootBoxes.map(lootbox => new Lootbox(client, lootbox));
  }
}

module.exports = Inventory;
