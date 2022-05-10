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
    Object.defineProperty(this, 'slot', { value: data.slot });
  }
}

module.exports = AvatarSlot;
