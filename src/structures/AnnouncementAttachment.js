'use strict';

const Base = require('./Base');

/**
 * Represents an announcement attachment.
 * @extends {Base}
 */
class AnnouncementAttachment extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Attachment name
     * @type {string}
     */
    this.name = data.filename;

    /**
     * Attachment URL
     * @type {string}
     */
    this.url = data.url;

    /**
     * Attachment Proxy URL
     * @type {string}
     */
    this.proxyURL = data.proxyUrl;

    /**
     * Attachment width
     * @type {number}
     */
    this.width = data.width;

    /**
     * Attachment width
     * @type {number}
     */
    this.height = data.height;
  }
}

module.exports = AnnouncementAttachment;
