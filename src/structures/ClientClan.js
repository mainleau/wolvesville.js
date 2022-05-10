'use strict';

const { Collection } = require('@discordjs/collection');
const ActiveClanQuest = require('./ActiveClanQuest');
const AvailableClanQuests = require('./AvailableClanQuests');
const Clan = require('./Clan');
const ClanLedgerField = require('./ClanLedgerField');
const ClanLog = require('./ClanLog');
const ClanChatManager = require('../managers/ClanChatManager');
const Routes = require('../util/Routes');

/**
 * Represents a client clan.
 * @extends {Clan}
 */
class ClientClan extends Clan {
  constructor(client, data) {
    super(client, data);

    /**
     * Clan gold count
     * @type {string}
     */
    this.goldCount = data.clan.gold;

    /**
     * Clan gem count
     * @type {string}
     */
    this.gemCount = data.clan.gems;

    /**
     * Clan chat
     * @type {string}
     */
    this.chat = new ClanChatManager(client);
  }

  /**
   * Fetch active quests.
   * @returns {Promise<ActiveClanQuest>}
   */
  async fetchActiveQuest() {
    if (!this.client.items.avatarItems.cache.size) await this.client.items.fetch();

    const response = await this.client.rest.get(Routes.ACTIVE_QUEST());
    if (response.code === 204) throw new Error('NO_ACTIVE_CLAN_QUEST');

    return new ActiveClanQuest(this.client, response);
  }

  /**
   * Fetch available quests.
   * @returns {Promise<AvailableClanQuests>}
   */
  async fetchAvailableQuests() {
    const response = await this.client.rest.get(Routes.AVAILABLE_QUEST());
    return new AvailableClanQuests(this.client, response);
  }

  /**
   * Fetch ledger.
   * @returns {Promise<Collection<string, ClanLedgerField>>}
   */
  async fetchLedger() {
    const response = await this.client.rest.get(Routes.LEDGER());

    const data = response.map(field => new ClanLedgerField(this.client, field));
    return data.reduce((col, field) => col.set(field.id, field), new Collection());
  }

  /**
   * Fetch log.
   * @returns {Promise<ClanLog[]>}
   */
  async fetchLog() {
    const response = await this.client.rest.get(Routes.LOG());
    return response.map(log => new ClanLog(this.client, log));
  }
}

module.exports = ClientClan;
