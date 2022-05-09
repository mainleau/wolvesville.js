'use strict';

const Base = require('./Base');

/**
 * Represents a role.
 * @extends {Base}
 */
class Role extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Role id
     * @type {string}
     */
    this.id = data.id;
  }
}

module.exports = Role;
