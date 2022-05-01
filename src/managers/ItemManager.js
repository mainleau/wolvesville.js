const { Collection } = require('@discordjs/collection');
const CacheManager = require('./CacheManager');
const Routes = require('../util/Routes');
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
   * @param {Object} [options={}] Options
   * @returns {Promise<Collection<string, AvatarItem>>}
   */
  async fetch(options = {}) {

    if(!options.force) {
      const existing = this.cache;
      if(existing.size) return existing;
    }

    const response = await this.client.rest.get(Routes.AVATAR_ITEMS());

    const data = response.map(item => new AvatarItem(this.client, item));
    return data.reduce((col, item) => col.set(item.id, this._add(item)), new Collection());
  }

}

module.exports = ItemManager;
