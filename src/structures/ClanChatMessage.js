'use strict';

const Base = require('./Base');
const ClanChatMessageAuthor = require('./ClanChatMessageAuthor');
const { ItemTypes } = require('../util/Constants');

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
      id: data.playerId,
    });

    /**
     * Message content
     * @type {?string}
     */
    this.content = data.msg ?? null;

    /**
     * Message emoji
     * @type {?Emoji}
     */
    this.emoji = client.items.resolve(data.emojiId, ItemTypes.EMOJI) ?? null;

    /**
     * Whether message is a system message
     * @type {boolean}
     */
    this.system = data.isSystem;

    /**
     * Message created timestamp
     * @type {number}
     */
    this.createdTimestamp = new Date(data.date).getTime();
  }
}

module.exports = ClanChatMessage;
