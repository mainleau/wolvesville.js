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

    const backgrounds = response.backgrounds.map(background => new Background(this.client, background));
    backgrounds.reduce(
      (col, background) => col.set(background.id, this.backgrounds._add(background)),
      new Collection(),
    );

    const loadingScreens = response.loadingScreens.map(loadingScreen => new LoadingScreen(this.client, loadingScreen));
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
}

module.exports = ItemManager;
