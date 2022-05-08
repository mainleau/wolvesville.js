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
     * Lootbox id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Lootbox type
     * @type {string}
     */
    this.type = data.event === 'EASTER' ? LootboxTypes.EASTER
      : data.event === 'HALLOWEEN' ? LootboxTypes.HALLOWEEN
      : data.event === 'XMAS' ? LootboxTypes.CHRISTMAS
      : data.event === 'ROLE_CARDS' ? LootboxTypes.ROLE_CARDS
      : data.event === 'LEVEL_UP_CARD' ? LootboxTypes.LEVEL_UP_CARD
      : LootboxTypes.DEFAULT;
  }
}

module.exports = Lootbox;
