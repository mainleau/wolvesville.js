'use strict';

const Base = require('./Base');
const ClanLedgerFieldPlayer = require('./ClanLedgerFieldPlayer');

/**
 * Represents a clan ledger field.
 * @extends {Base}
 */
class ClanLedgerField extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Field id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Field creation timestamp
     * @type {ClanLedgerFieldPlayer}
     */
    this.player = new ClanLedgerFieldPlayer(client, data);

    /**
     * Field type
     * @type {boolean}
     */
    this.type = data.gold ? 0 : 1;

    /**
     * Field amount
     * @type {number}
     */
    this.amount = data.gold || data.gems;

    /**
     * Field creation timestamp
     * @type {number}
     */
    this.creationTimestamp = new Date(data.creationTime).getTime();
  }
}

module.exports = ClanLedgerField;
