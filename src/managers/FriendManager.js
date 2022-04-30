const { Collection } = require('@discordjs/collection');
const CacheManager = require('./CacheManager');
const Routes = require('../util/Routes');
const Friend = require('../structures/Friend');

/**
 * Manages API methods for Friends.
 * @extends {BaseManager}
 */
class FriendManager extends CacheManager {
  constructor(client) {
    super(client);
  }

  /**
   * Fetch friends.
   * @param {Object} [options={}] Options
   * @returns {Promise<Collection<string, Friend>>}
   */
  async fetch(options = {}) {

    if(!options.force) {
      return this.cache;
    }

    const response = await this.client.rest.get(Routes.FRIENDS());

    const data = response.map(friend => new Friend(this.client, friend));
    return data.reduce((col, friend) => col.set(friend.id, this._add(friend)), new Collection());
  }

}

module.exports = FriendManager;
