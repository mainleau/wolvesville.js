'use strict';

const { Collection } = require('@discordjs/collection');
const BaseManager = require('./BaseManager');
const CacheManager = require('./CacheManager');
const AvatarItem = require('../structures/AvatarItem');
const Background = require('../structures/Background');
const Emoji = require('../structures/Emoji');
const LoadingScreen = require('../structures/LoadingScreen');
const Offer = require('../structures/Offer');
const ProfileIcon = require('../structures/ProfileIcon');
const RosePackage = require('../structures/RosePackage');
const Talisman = require('../structures/Talisman');
const { ItemTypes } = require('../util/Constants');
const Routes = require('../util/Routes');

/**
 * Manages API methods for items.
 * @extends {BaseManager}
 */
class ItemManager extends BaseManager {
  constructor(client) {
    super(client);

    this.avatarItems = new CacheManager(this);
    this.profileIcons = new CacheManager(this);
    this.backgrounds = new CacheManager(this);
    this.loadingScreens = new CacheManager(this);
    this.emojis = new CacheManager(this);
    this.talismans = new CacheManager(this);
    this.offers = new CacheManager(this);
    this.rosePackages = new CacheManager(this);
  }

  /**
   * Fetch items.
   * @returns {Promise<Object>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.ITEMS());

    const avatarItems = response.avatarItems.map(item => new AvatarItem(this.client, item));
    avatarItems.reduce((col, item) => col.set(item.id, this.avatarItems._add(item)), new Collection());

    const profileIcons = response.profileIcons.map(profileIcon => new ProfileIcon(this.client, profileIcon));
    profileIcons.reduce(
      (col, profileIcon) => col.set(profileIcon.id, this.profileIcons._add(profileIcon)),
      new Collection(),
    );

    const backgrounds = response.backgrounds.map(
      background =>
        new Background(this.client, {
          id: background.id,
          name: background.imageStoreDay.fileName.slice(0, -4),
          rarity: background.rarity,
          dayColor: background.backgroundColorDay,
          nightColor: background.backgroundColorNight,
        }),
    );

    backgrounds.reduce(
      (col, background) => col.set(background.id, this.backgrounds._add(background)),
      new Collection(),
    );

    const loadingScreens = response.loadingScreens.map(
      loadingScreen =>
        new LoadingScreen(this.client, {
          id: loadingScreen.id,
          name: loadingScreen.imageStore.fileName.slice(0, -4),
          rarity: loadingScreen.rarity,
          accentColor: loadingScreen.imagePrimaryColor,
        }),
    );

    loadingScreens.reduce(
      (col, loadingScreen) => col.set(loadingScreen.id, this.loadingScreens._add(loadingScreen)),
      new Collection(),
    );

    const emojis = response.emojis.map(emoji => new Emoji(this.client, emoji));
    emojis.reduce((col, emoji) => col.set(emoji.id, this.emojis._add(emoji)), new Collection());

    const talismans = response.talismans.map(talisman => new Talisman(this.client, talisman));
    talismans.reduce((col, talisman) => col.set(talisman.id, this.talismans._add(talisman)), new Collection());

    const offers = response.gemOffers.map(offer => new Offer(this.client, offer));
    offers.reduce((col, offer) => col.set(offer.name, this.offers._add(offer, { id: offer.name })), new Collection());

    const rosePackages = response.rosePackages.map(rosePackage => new RosePackage(this.client, rosePackage));
    rosePackages.reduce(
      (col, rosePackage) => col.set(rosePackage.id, this.rosePackages._add(rosePackage)),
      new Collection(),
    );

    return { avatarItems, profileIcons, backgrounds, loadingScreens, emojis, talismans, offers, rosePackages };
  }

  /**
   * Resolve an item.
   * @param {Object|string} item Item object of id
   * @param {string} [type] Item type
   * @returns {?(AvatarItem|Background|LoadingScreen|ProfileIcon|Emoji|Talisman|RosePackage)}
   */
  resolve(item, type) {
    if (!item || !type) return null;
    if (typeof item === 'string') item = { id: item };

    switch (type) {
      case ItemTypes.AVATAR_ITEM:
        return this.avatarItems.cache.get(item.id) ?? new AvatarItem(this.client, [item.id]);
      case ItemTypes.BACKGROUND:
        return this.backgrounds.cache.get(item.id) ?? new Background(this.client, item);
      case ItemTypes.LOADING_SCREEN:
        return this.loadingScreens.cache.get(item.id) ?? new LoadingScreen(this.client, item);
      case ItemTypes.PROFILE_ICON:
        return this.profileIcons.cache.get(item.id) ?? new ProfileIcon(this.client, item);
      case ItemTypes.EMOJI:
        return this.emojis.cache.get(item.id) ?? new Emoji(this.client, item);
      case ItemTypes.TALISMAN:
        return this.talismans.cache.get(item.id) ?? new Talisman(this.client, item);
      case ItemTypes.ROSE_PACKAGE:
        return this.rosePackages.cache.get(item.id) ?? new RosePackage(this.client, item);
      default:
        return null;
    }
  }
}

module.exports = ItemManager;
