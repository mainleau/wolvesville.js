'use strict';

const BaseFriendRequest = require('./BaseFriendRequest');
const FriendRequestSender = require('./FriendRequestSender');

/**
 * Represents a received friend request.
 * @extends {BaseFriendRequest}
 */
class ReceivedFriendRequest extends BaseFriendRequest {
  constructor(client, data) {
    super(client, data);

    /**
     * Request sender
     * @type {FriendRequestSender}
     */
    this.sender = new FriendRequestSender(client, data.originator);
  }
}

module.exports = ReceivedFriendRequest;
