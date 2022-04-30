const Base = require('./Base');
const { LootboxTypes } = require('../util/Constants');

/**
 * Represents a lootbox.
 * @extends {Base}
 */
class Lootbox extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Lootbox id.
     * @type {string}
     */
    this.id = data.id;

    /**
     * Lootbox type.
     * @type {number}
     */
    this.type = LootboxTypes[data.event] || 0;
  }
}

module.exports = Lootbox;
