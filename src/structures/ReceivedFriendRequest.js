'use strict';

const FriendRequest = require('./FriendRequest');
const FriendRequestSender = require('./FriendRequestSender');

/**
 * Represents a received friend request.
 * @extends {FriendRequest}
 */
class ReceivedFriendRequest extends FriendRequest {
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
