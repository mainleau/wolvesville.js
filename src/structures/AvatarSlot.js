'use strict';

const Avatar = require('./Avatar');

/**
 * Represents an avatar slot.
 * @extends {Avatar}
 */
class AvatarSlot extends Avatar {
  constructor(client, data) {
    super(client, data);

    /**
     * Slot number
     * @type {number}
     */
    this.slot = data.slot;
  }
}

module.exports = AvatarSlot;
