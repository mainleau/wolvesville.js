'use strict';

/**
 * Options for a client.
 * @typedef {Object} ClientOptions
 * @property {number} [tokenRefreshInterval=3_300_000] Token refresh interval
 * @property {number} [restRequestTimeout=15_000] REST request timeout
 * @property {HTTPOptions} [http] HTTP options
 */

/**
 * HTTP options.
 * @typedef {Object} HTTPOptions
 * @property {APIOptions} [api] API urls
 * @property {string} [cdn='https://cdn.wolvesville.com'] Base URL of the CDN
 */

/**
 * API options.
 * @typedef {Object} APIOptions
 * @property {string} [auth='https://api-auth.wolvesville.com'] Base URL of the auth API
 * @property {string} [core='https://api-core.wolvesville.com'] Base URL of the core API
 * @property {string} [game='https://api-game.wolvesville.com'] Base URL of the game API
 */

/**
 * Contains various utilities for client options.
 */
class Options {
  /**
   * The default client options.
   * @returns {ClientOptions}
   */
  static createDefault() {
    return {
      tokenRefreshInterval: 3_300_000,
      restRequestTimeout: 15_000,
      http: {
        api: {
          auth: 'https://api-auth.wolvesville.com',
          core: 'https://api-core.wolvesville.com',
          game: 'https://api-game.wolvesville.com',
        },
        cdn: {
          items: 'https://cdn.wolvesville.com',
          avatars: 'https://cdn-avatars.wolvesville.com',
        },
      },
    };
  }
}

module.exports = Options;