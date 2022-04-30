const Base = require('./Base');
const AnnouncementAuthor = require('./AnnouncementAuthor');

/**
 * Represents an announcement.
 * @extends {Base}
 */
class Attachment extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Attachment name.
     * @type {string}
     */
    this.name = data.filename;

    /**
     * Attachment URL.
     * @type {string}
     */
    this.url = data.url;

    /**
     * Attachment Proxy URL.
     * @type {string}
     */
    this.proxyURL = data.proxyUrl;

    /**
     * Attachment width.
     * @type {number}
     */
    this.width = data.width;

    /**
     * Attachment width.
     * @type {number}
     */
    this.height = data.height;
  }
}

module.exports = Attachment;
