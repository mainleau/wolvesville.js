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
     * @type {AvatarItem[]}
     */
    this.avatarItems = data.avatarItemIds.map(id => client.items.resolve(id, ItemTypes.AVATAR_ITEM));

    /**
     * Profile icons
     * @type {ProfileIcon[]}
     */
    this.profileIcons = data.ownedProfileIcons.map(profileIcon =>
      client.items.resolve(profileIcon.profileIconId, ItemTypes.PROFILE_ICON),
    );

    /**
     * Backgrounds
     * @type {Background[]}
     */
    this.backgrounds = data.ownedBackgroundIds.map(id => client.items.resolve(id, ItemTypes.BACKGROUND));

    /**
     * Loading screens
     * @type {LoadingScreen[]}
     */
    this.loadingScreens = data.ownedLoadingScreenIds.map(id => client.items.resolve(id, ItemTypes.LOADING_SCREEN));

    /**
     * Emojis
     * @type {Emoji[]}
     */
    this.emojis = data.ownedEmojis.map(emoji => client.items.resolve(emoji.emojiId, ItemTypes.EMOJI));

    /**
     * Taslismans
     * @type {Talisman[]}
     */
    this.talismans = data.ownedTalismans.map(talisman => client.items.resolve(talisman.talismanId, ItemTypes.TALISMAN));

    /**
     * Lootboxes
     * @type {Lootbox[]}
     */
    this.lootboxes = data.lootBoxes.map(lootbox => new Lootbox(client, lootbox));
  }
}

module.exports = Inventory;
