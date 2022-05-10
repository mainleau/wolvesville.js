'use strict';

const Base = require('./Base');
const ClanLogPlayer = require('./ClanLogPlayer');
const { ClanActions } = require('../util/Constants');

/**
 * Represents a clan log.
 * @extends {Base}
 */
class ClanLog extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Log action
     * @type {string}
     */
    this.action = ClanActions[data.action];

    /**
     * Log target player
     * @type {ClanLogPlayer}
     */
    this.target = new ClanLogPlayer(client, {
      username: data.playerUsername ? data.playerUsername : data.memberUsername,
    });

    if (data.playerUsername) {
      /**
       * Log executor username
       * @type {string}
       */
      this.executor = new ClanLogPlayer(client, {
        username: data.playerUsername ? data.memberUsername : data.playerUsername,
      });
    }

    /**
     * Log created timestamp
     * @type {number}
     */
    this.createdTimestamp = new Date(data.creationTime).getTime();
  }
}

module.exports = ClanLog;
