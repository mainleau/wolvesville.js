const Base = require('./Base');
const FriendRequestSender = require('./FriendRequestSender');
const FriendRequestRecipient = require('./FriendRequestRecipient');

/**
 * Represents a friend request.
 * @extends {Base}
 */
class FriendRequest extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Request id.
     * @type {string}
     */
    this.id = data.id;

    /**
     * Request created timestamp.
     * @type {number}
     */
    this.createdTimestamp = new Date(data.creationTime).getTime();
  }
}

module.exports = FriendRequest;
