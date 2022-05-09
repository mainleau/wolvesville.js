'use strict';

const Base = require('./Base');

/**
 * Represents a friend request.
 * @extends {Base}
 */
class FriendRequest extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Request id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Request created timestamp
     * @type {number}
     */
    this.createdTimestamp = new Date(data.creationTime).getTime();
  }
}

module.exports = FriendRequest;
