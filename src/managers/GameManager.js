const BaseManager = require('./BaseManager');
const CustomGame = require('../structures/CustomGame');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Manages API methods for games.
 * @extends {BaseManager}
 */
class GameManager extends BaseManager {
  constructor(client) {
    super(client);
  }

  /**
   * Fetch custom game lobbies.
   * @returns {Promise<CustomGame[]>}
   */
  async fetchCustom(language) {
    if(!language || typeof language !== 'string') throw new Error('INVALID_LANGUAGE_FORMAT');
    if(!['en', 'de', 'fr', 'tr', 'pt', 'th', 'nl', 'es', 'ru', 'vi', 'it'].includes(language)) throw new Error('INCORRECT_LANGUAGE');
    const request = await fetch(`${this.client.options.http.api.game}/api/public/game/custom?language=${language}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response.openGames.map(game => new CustomGame(this.client, game));
  }

}

module.exports = GameManager;
