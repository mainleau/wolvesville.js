'use strict';

/**
 * Options for a REST instance.
 * @typedef {Object} RESTOptions
 * @property {number} [timeout=15_000] The time to wait in milliseconds before a request is aborted
 * @property {APIOptions} [api] API options
 * @property {CDNOptions} [cdn] CDN options
 */

/**
 * API options.
 * @typedef {Object} APIOptions
 * @property {string} [auth='https://api-auth.wolvesville.com'] Base URL of the auth API
 * @property {string} [core='https://api-core.wolvesville.com'] Base URL of the core API
 * @property {string} [game='https://api-game.wolvesville.com'] Base URL of the game API
 */

/**
 * CDN options.
 * @typedef {Object} CDNOptions
 * @property {string} [items='https://cdn.wolvesville.com'] CDN URL of the items
 * @property {string} [avatars='https://cdn-avatars.wolvesville.com'] CDN URL of the avatars
 */

/**
 * Options to be passed when creating the REST instance.
 */
class RESTOptions {
  /**
   * The default REST options.
   * @returns {RESTOptions}
   */
  static createDefault() {
    return {
      timeout: 15_000,
      api: {
        auth: 'https://api-auth.wolvesville.com',
        core: 'https://api-core.wolvesville.com',
        game: 'https://api-game.wolvesville.com',
      },
      cdn: {
        items: 'https://cdn.wolvesville.com',
        avatars: 'https://cdn-avatars.wolvesville.com',
      },
    };
  }
}

module.exports = RESTOptions;
