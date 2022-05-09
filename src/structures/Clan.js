'use strict';

const { Collection } = require('@discordjs/collection');
const BaseClan = require('./BaseClan');
const ClanMember = require('./ClanMember');
const ClientClanMember = require('./ClientClanMember');
const { ClanRanks } = require('../util/Constants');

/**
 * Represents a clan.
 * @extends {BaseClan}
 */
class Clan extends BaseClan {
  constructor(client, data) {
    super(client, data);

    /**
     * Clan members
     * @type {Collection<string, ClanMember|ClientClanMember>}
     */
    this.members = new Collection();

    for (const member of data.members.values()) {
      member.clan = data.clan;
      this.members.set(
        member.playerId,
        this.constructor === Clan ? new ClanMember(client, member) : new ClientClanMember(client, member),
      );
    }
  }

  /**
   * Clan coleaders
   * @type {Collection<string, ClanMember|ClientClanMember>}
   * @readonly
   */
  get coleaders() {
    return this.members.filter(member => member.rank === ClanRanks.COLEADER);
  }

  /**
   * Clan leader
   * @type {ClanMember|ClientClanMember}
   * @readonly
   */
  get leader() {
    return this.members.find(member => member.rank === ClanRanks.LEADER);
  }

  /**
   * Wether the clan is the client clan
   * @type {boolean}
   * @readonly
   */
  get own() {
    return this.constructor !== Clan;
  }
}

module.exports = Clan;
