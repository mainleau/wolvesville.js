const { Collection } = require('@discordjs/collection');
const BaseManager = require('./BaseManager');
const AvatarItemManager = require('./AvatarItemManager');
const ProfileIconManager = require('./ProfileIconManager');
const AvatarItem = require('../structures/AvatarItem');
const ProfileIcon = require('../structures/ProfileIcon');
const Routes = require('../util/Routes');

/**
 * Manages API methods for items.
 * @extends {BaseManager}
 */
class ItemManager extends BaseManager {
  constructor(client) {
    super(client);

    this.avatarItems = new AvatarItemManager(this);
    this.profileIcons = new ProfileIconManager(this);
  }

  /**
   * Fetch items.
   * @returns {Promise<Object>}
   */
  async fetch() {
    const response = await this.client.rest.get(Routes.ITEMS());

    const avatarItems = response.avatarItems.map(item => new AvatarItem(this.client, item));
    avatarItems.reduce((col, item) => col.set(item.id, this.avatarItems._add(item)), new Collection());

    const profileIcons = response.profileIcons.map(item => new ProfileIcon(this.client, item));
    profileIcons.reduce((col, icon) => col.set(icon.id, this.profileIcons._add(icon)), new Collection());

    return { avatarItems, profileIcons };
  }

}

module.exports = ItemManager;
