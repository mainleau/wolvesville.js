const Base = require('./Base');
const AvatarItem = require('./AvatarItem');

/**
 * Represents limited items.
 * @extends {Base}
 */
class LimitedItems extends Base {
  constructor(client, data) {
    super(client);

    this.type = data.type;
    this.items = data.avatarItemIds.map(id => new AvatarItem(client, { id }));
    this.expirationTimestamp = new Date(data.expireDate).getTime();
    this.giftable = data.canBeGifted;
  }
}

module.exports = LimitedItems;
