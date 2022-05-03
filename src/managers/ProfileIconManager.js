const { Collection } = require('@discordjs/collection');
const BaseManager = require('./BaseManager');
const CacheManager = require('./CacheManager');
const Routes = require('../util/Routes');
const AvatarItem = require('../structures/AvatarItem');

/**
 * Manages API methods for icons.
 * @extends {CacheManager}
 */
class ProfileIconManager extends CacheManager {
  constructor(client) {
    super(client);
  }
}

module.exports = ProfileIconManager;
