'use strict';

const Base = require('./Base');
const Lootbox = require('./Lootbox');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents an inventory.
 * @extends {Base}
 */
class Inventory extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Gold count
     * @type {number}
     */
    this.goldCount = data.silverCount;

    /**
     * Rose count
     * @type {number}
     */
    this.roseCount = data.roseCount;

    /**
     * Gem count
     * @type {number}
     */
    this.gemCount = data.gemCount;

    /**
     * Loyalty token count
     * @type {number}
     */
    this.loyaltyTokenCount = data.loyaltyTokenCount;

    /**
     * Avatar items
     * @type {Array}
     */
    this.avatarItems = data.avatarItemIds.map(id => client.items.resolve(id, ItemTypes.AVATAR_ITEM));

    /**
     * Profile icons
     * @type {Array}
     */
    this.profileIcons = data.ownedProfileIcons.map(profileIcon =>
      client.items.resolve(profileIcon.profileIconId, ItemTypes.PROFILE_ICON),
    );

    /**
     * Backgrounds
     * @type {Array}
     */
    this.backgrounds = data.ownedBackgroundIds.map(id => client.items.resolve(id, ItemTypes.BACKGROUND));

    /**
     * Loading screens
     * @type {Array}
     */
    this.loadingScreens = data.ownedLoadingScreenIds.map(id => client.items.resolve(id, ItemTypes.LOADING_SCREEN));

    /**
     * Emojis
     * @type {Array}
     */
    this.emojis = data.ownedEmojis.map(emoji => client.items.resolve(emoji.emojiId, ItemTypes.EMOJI));

    /**
     * Taslismans
     * @type {Array}
     */
    this.talismans = data.ownedTalismans.map(talisman => client.items.resolve(talisman.talismanId, ItemTypes.TALISMAN));

    /**
     * Lootboxes
     * @type {Array}
     */
    this.lootboxes = data.lootBoxes.map(lootbox => new Lootbox(client, lootbox));
  }
}

module.exports = Inventory;
