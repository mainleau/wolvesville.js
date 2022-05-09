'use strict';

const BaseManager = require('./BaseManager');
const CustomGame = require('../structures/CustomGame');
const Routes = require('../util/Routes');

/**
 * Manages API methods for games.
 * @extends {BaseManager}
 */
class GameManager extends BaseManager {
  /**
   * Fetch custom game lobbies.
   * @param {string} language Custom lobbies language
   * @returns {Promise<CustomGame[]>}
   */
  async fetchCustom(language) {
    if (!language || typeof language !== 'string') throw new Error('INVALID_LANGUAGE_FORMAT');
    if (!['en', 'de', 'fr', 'tr', 'pt', 'th', 'nl', 'es', 'ru', 'vi', 'it'].includes(language)) {
      throw new Error('INCORRECT_LANGUAGE');
    }
    const response = await this.client.rest.get(Routes.CUSTOM_GAME_LOBBIES(), { query: { language } });

    return response.openGames.map(game => new CustomGame(this.client, game));
  }
}

module.exports = GameManager;
