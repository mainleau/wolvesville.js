'use strict';

const BasePlayer = require('./BasePlayer');

/**
 * Represents a player of a clan ledger field.
 * @extends {BasePlayer}
 */
class ClanLedgerFieldPlayer extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Field player
     * @type {string}
     */
    this.username = data.playerUsername;
  }
}

module.exports = ClanLedgerFieldPlayer;
