'use strict';

const Base = require('./Base');

/**
 * Represents an owned clan icon.
 * @extends {Base}
 */
class OwnedClanIcon extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Icon name
     * @type {string}
     */
    this.name = data.name.split(':')[1];

    /**
     * Icon color
     * @type {string}
     */
    this.color = data.color;
  }
}

module.exports = OwnedClanIcon;
