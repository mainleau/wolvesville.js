'use strict';

const BasePlayer = require('./BasePlayer');

/**
 * Represents a clan chat message author.
 * @extends {Base}
 */
class ClanChatMessageAuthor extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Message author id.
     * @type {string}
     */
    this.id = data.id;
  }
}

module.exports = ClanChatMessageAuthor;
