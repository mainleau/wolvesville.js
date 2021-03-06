'use strict';

const AnnouncementAttachment = require('./AnnouncementAttachment');
const AnnouncementAuthor = require('./AnnouncementAuthor');
const Base = require('./Base');

/**
 * Represents an announcement.
 * @extends {Base}
 */
class Announcement extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Announcement author
     * @type {AnnouncementAuthor}
     */
    this.author = new AnnouncementAuthor(client, data.author);

    /**
     * Announcement content
     * @type {string}
     */
    this.content = data.content;

    /**
     * Announcement attachments
     * @type {AnnouncementAttachment[]}
     */
    this.attachments = data.attachments.map(attachment => new AnnouncementAttachment(client, attachment));

    /**
     * Announcement created timestamp
     * @type {number}
     */
    this.createdTimestamp = new Date(data.timestamp).getTime();
  }
}

module.exports = Announcement;
