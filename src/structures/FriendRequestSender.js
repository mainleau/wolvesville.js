const FriendRequestPlayer = require('./FriendRequestPlayer');

/**
 * Represents a friend request sender.
 * @extends {BasePlayer}
 */
class FriendRequestSender extends FriendRequestPlayer {
  constructor(client, data) {
    super(client, data);
  }
}

module.exports = FriendRequestSender;
