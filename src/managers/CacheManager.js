'use strict';

const { Collection } = require('@discordjs/collection');
const BaseManager = require('./BaseManager');

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

  _add(data, { id } = {}) {
    this.cache.set(id ?? data.id, data);
    return data;
  }
}

module.exports = CacheManager;
