'use strict';

const ProfileIcon = require('./ProfileIcon');

/**
 * Represents an owned profile icon.
 * @extends {ProfileIcon}
 */
class OwnedProfileIcon extends ProfileIcon {
  constructor(client, data) {
    super(client, data);

    this.name = data.name ?? null;

    this.purchasable = data.purchasable ?? null;

    /**
     * Profile icon color
     * @type {string}
     */
    this.color = data.color;
  }
}

module.exports = OwnedProfileIcon;
