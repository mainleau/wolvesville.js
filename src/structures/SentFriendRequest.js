'use strict';

const BaseFriendRequest = require('./BaseFriendRequest');
const FriendRequestRecipient = require('./FriendRequestRecipient');

/**
 * Represents a sent friend request.
 * @extends {BaseFriendRequest}
 */
class SentFriendRequest extends BaseFriendRequest {
  constructor(client, data) {
    super(client, data);

    /**
     * Request recipient
     * @type {FriendRequestRecipient}
     */
    this.recipient = new FriendRequestRecipient(client, data.target);
  }
}

module.exports = SentFriendRequest;
