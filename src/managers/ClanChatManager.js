const BaseManager = require('./BaseManager');
const Routes = require('../util/Routes');
const ClanChatMessage = require('../structures/ClanChatMessage');
const { Error } = require('../errors');

/**
 * Manages API methods for ClanChatMessages.
 * @extends {BaseManager}
 */
class ClanChatManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  /**
   * Obtains one or multiple messages.
   * @param {string} timestamp Date of messages around
   * @returns {Promise<ClanChatMessage[]>}
   */
  async fetchMessages(timestamp) {

    if(timestamp) {
      const date = new Date(timestamp);
      if(isNaN(timestamp) || timestamp !== date.getTime()) throw new Error('INVALID_TIMESTAMP');
      timestamp = date.toISOString();
    }

    const response = await this.client.rest.get(Routes.CLAN_CHAT(), { query: { oldest: timestamp }});
    return response.map(message => new ClanChatMessage(this.client, message));
  }

}

module.exports = ClanChatManager;
