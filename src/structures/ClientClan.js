'use strict';

const { Collection } = require('@discordjs/collection');
const fetch = require('node-fetch');
const ActiveClanQuest = require('./ActiveClanQuest');
const AvailableClanQuests = require('./AvailableClanQuests');
const Clan = require('./Clan');
const ClanLedgerField = require('./ClanLedgerField');
const ClanLog = require('./ClanLog');
const ClanChatManager = require('../managers/ClanChatManager');
const { getAuthenticationHeaders } = require('../util/Headers');

/**
 * Represents a client clan.
 * @extends {Clan}
 */
class ClientClan extends Clan {
  constructor(client, data) {
    super(client, data);

    /**
     * Clan gold count.
     * @type {string}
     */
    this.goldCount = data.clan.gold;

    /**
     * Clan gem count.
     * @type {string}
     */
    this.gemCount = data.clan.gems;

    /**
     * Clan chat.
     * @type {string}
     */
    this.chat = new ClanChatManager(client);
  }

  /**
   * Active quests.
   * @returns {Promise<ActiveClanQuest>}
   */
  async fetchActiveQuest() {
    const request = await fetch(`${this.client.options.http.api.core}/clanQuests/active`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token),
    });
    if (request.status === 204) return null;

    const response = await request.json();
    return new ActiveClanQuest(this.client, response);
  }

  /**
   * Available quests.
   * @returns {Promise<AvailableClanQuests>}
   */
  async fetchAvailableQuests() {
    const request = await fetch(`${this.client.options.http.api.core}/clanQuests/available`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token),
    });
    const response = await request.json();
    return new AvailableClanQuests(this.client, response);
  }

  async fetchLedger() {
    const request = await fetch(`${this.client.options.http.api.core}/clans/gold/all`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token),
    });
    const response = await request.json();

    const fetchedFields = new Collection();

    for (const field of response) {
      fetchedFields.set(field.id, new ClanLedgerField(this.client, field));
    }
    return fetchedFields;
  }

  async fetchLog() {
    const request = await fetch(`${this.client.options.http.api.core}/clans/logs`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token),
    });

    const response = await request.json();
    return response.map(log => new ClanLog(this.client, log));
  }
}

module.exports = ClientClan;
