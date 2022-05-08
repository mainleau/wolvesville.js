const Base = require('./Base');
const { Rarities } = require('../util/Constants');

/**
 * Represents a profile icon.
 * @extends {Base}
 */
class ProfileIcon extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Profile icon id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Profile icon name
     * @type {string}
     */
    this.name = data.name.split(':')[1];

    /**
     * Profile icon rarity
     * @type {string}
     */
    this.rarity = Rarities[data.rarity];

    if(data.costInSilver !== -1 || data.costInRoses !== -1) {
      /**
       * Profile icon cost
       * @type {number}
       */
      Object.defineProperty(this, 'cost', {
        value: data.costInSilver !== -1 ? data.costInSilver : data.costInRoses
      });
    }

    Object.defineProperty(this, 'purchasable', {
      /**
       * Wether profile icon is purchasable
       * @type {string}
       */
      value: data.isPurchasable & data.showInInventory
    });

    if(data.event) {
      /**
       * Profile icon event
       * @type {string}
       */
      Object.defineProperty(this, 'event', { value: data.event });
    }
  }
}

module.exports = ProfileIcon;
