'use strict';

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
    this.avatarItems = data.avatarItemIds.map(id => client.items.avatarItems.cache.get(id));

    /**
     * Profile icons.
     * @type {Array}
     */
    this.profileIcons = data.ownedProfileIcons.map(profileIcon =>
      client.items.profileIcons.cache.get(profileIcon.profileIconId),
    );

    /**
     * Backgrounds.
     * @type {Array}
     */
    this.backgrounds = data.ownedBackgroundIds.map(id => client.items.backgrounds.cache.get(id));

    /**
     * Loading screens.
     * @type {Array}
     */
    this.loadingScreens = data.ownedLoadingScreenIds.map(id => client.items.loadingScreens.cache.get(id));

    /**
     * Emojis.
     * @type {Array}
     */
    this.emojis = data.ownedEmojis.map(emoji => client.items.emojis.cache.get(emoji.emojiId));

    /**
     * Taslismans.
     * @type {Array}
     */
    this.talismans = data.ownedTalismans.map(talisman => client.items.talismans.cache.get(talisman.talismanId));

    /**
     * Lootboxes.
     * @type {Array}
     */
    this.lootboxes = data.lootBoxes.map(lootbox => new Lootbox(client, lootbox));
  }
}

module.exports = Inventory;
