const FriendRequestPlayer = require('./FriendRequestPlayer');

/**
 * Represents a friend request recipient.
 * @extends {BasePlayer}
 */
class FriendRequestRecipient extends FriendRequestPlayer {
  constructor(client, data) {
    super(client, data);
  }
}

module.exports = FriendRequestRecipient;
