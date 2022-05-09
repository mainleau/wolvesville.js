'use strict';

const Avatar = require('./Avatar');
const Base = require('./Base');

/**
 * Represents player equipped items.
 * @extends {Base}
 */
class EquippedItems extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Player avatar
     * @type {Avatar}
     */
    this.avatar = new Avatar(client, data);

    /**
     * Player icon
     * @type {Object}
     */
    this.icon = {
      id: data.profileIconId,
      color: data.profileIconColor,
    };
  }
}

module.exports = EquippedItems;
