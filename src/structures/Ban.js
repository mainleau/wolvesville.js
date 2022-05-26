'use strict';

const Base = require('./Base');

/**
 * Represents a ban.
 * @extends {Base}
 */
class Ban extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Ban reason
     * @type {string}
     */
    this.reason = data.reason;

    /**
     * Ban message
     * @type {string}
     */
    this.message = data.message;

    /**
     * Ban expiration timestamp
     * @type {number}
     */
    this.expirationTimestamp = data.expirationTimestamp;
  }
}

module.exports = Ban;
