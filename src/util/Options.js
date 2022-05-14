'use strict';

const RESTOptions = require('../rest/RESTOptions');

/**
 * Options for a client.
 * @typedef {Object} ClientOptions
 * @property {number} [tokenRefreshInterval=3_300_000] Token refresh interval
 * @property {RESTOptions} [rest] REST options
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
      rest: RESTOptions.createDefault(),
    };
  }
}

module.exports = Options;
