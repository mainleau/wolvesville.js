const Base = require('./Base');
const RoleCardPerk = require('./RoleCardPerk');
const { Rarities } = require('../util/Constants');

/**
 * Represents a role card.
 * @extends {Base}
 */
class RoleCard extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Card id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Card role id
     * @type {string}
     */
    this.role = data.roleId1;

    /**
     * Card advanced role id
     * @type {?string}
     */
    this.advancedRole = data.roleId2 || null;

    /**
     * Card rarity
     * @type {string}
     */
    this.rarity = Rarities[data.rarity];

    /**
     * Card perks
     * @type {RoleCardPerk[]}
     */
    this.perks = data.allAbilities.map(ability => new RoleCardPerk(client, ability));

    /**
     * Wether card is equipped
     * @type {boolean}
     */
    this.equipped = data.equipped;
  }
}

module.exports = RoleCard;
