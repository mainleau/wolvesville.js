const BaseManager = require('./BaseManager');
const { Collection } = require('@discordjs/collection');

/**
 * Manages the API methods of a data model with a mutable cache of instances.
 * @extends {BaseManager}
 * @abstract
 */
class CacheManager extends BaseManager {
  constructor(client) {
    super(client);
    this.cache = new Collection();
  }

  _add(data) {
    this.cache.set(data.id, data);
    return data;
  }

}

module.exports = CacheManager;
