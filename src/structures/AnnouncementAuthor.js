const Base = require('./Base');

/**
 * Represents an announcement author.
 * @extends {Base}
 */
class AnnouncementAuthor extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Message author username.
     * @type {string}
     */
    this.username = data.username;
  }
}

module.exports = AnnouncementAuthor;
