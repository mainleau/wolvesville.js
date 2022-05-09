'use strict';

const Base = require('./Base');
const ClanChatMessageAuthor = require('./ClanChatMessageAuthor');

/**
 * Represents a clan chat message.
 * @extends {Base}
 */
class ClanChatMessage extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Message author
     * @type {ClanChatMessageAuthor}
     */
    this.author = new ClanChatMessageAuthor(client, {
      id: data,
    });

    /**
     * Message content
     * @type {string}
     */
    this.content = data.msg;

    /**
     * Message created timestamp
     * @type {number}
     */
    this.createdTimestamp = new Date(data.date).getTime();

    /**
     * Is a system message
     * @type {boolean}
     */
    this.system = data.isSystem;
  }
}

module.exports = ClanChatMessage;
