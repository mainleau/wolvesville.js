const { Collection } = require('@discordjs/collection');
const CacheManager = require('./CacheManager');
const AvatarItem = require('../structures/AvatarItem');

/**
 * Manages API methods for items.
 * @extends {BaseManager}
 */
class ItemManager extends CacheManager {
  constructor(client) {
    super(client);
  }

  /**
   * Fetch items.
   * @returns {Promise<Collection<string, AvatarItem>>}
   */
  async fetch() {
    const response = await this.client.api.avatarItems().get();

    const data = response.map(item => new AvatarItem(this.client, item));
    return data.reduce((col, item) => col.set(item.id, this._add(item)), new Collection());
  }

}

module.exports = ItemManager;
