const Base = require('./Base');
const Avatar = require('./Avatar')

/**
 * Represents an avatar slot.
 * @extends {Base}
 */
class AvatarSlot extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Slot number
     * @type {number}
     */
    this.slot = data.slot;

    /**
     * Avatar
     * @type {Avatar}
     */
    this.avatar = new Avatar(client, data);
  }
}

module.exports = AvatarSlot;
