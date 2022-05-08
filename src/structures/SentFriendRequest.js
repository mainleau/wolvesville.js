const Base = require('./Base');
const FriendRequest = require('./FriendRequest');
const FriendRequestRecipient = require('./FriendRequestRecipient');

/**
 * Represents a sent friend request.
 * @extends {FriendRequest}
 */
class SentFriendRequest extends FriendRequest {
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
