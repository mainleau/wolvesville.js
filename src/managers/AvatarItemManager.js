const { Collection } = require('@discordjs/collection');
const BaseManager = require('./BaseManager');
const CacheManager = require('./CacheManager');
const Routes = require('../util/Routes');
const AvatarItem = require('../structures/AvatarItem');

/**
 * Manages API methods for avatar items.
 * @extends {CacheManager}
 */
class AvatarItemManager extends CacheManager {
  constructor(client) {
    super(client);
  }
}

module.exports = AvatarItemManager;
