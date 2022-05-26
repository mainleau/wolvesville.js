'use strict';

const Base = require('./Base');
const Role = require('./Role');

/**
 * Represents an achievement.
 * @extends {Base}
 */
class Achievement extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Achievement category
     * @type {string}
     */
    this.category = data.category;

    /**
     * Achievement level
     * @type {number}
     */
    this.level = data.level;

    /**
     * Achievement points
     * @type {number}
     */
    this.points = data.points;

    /**
     * Achievement points
     * @type {number}
     */
    this.requiredPoints = data.pointsNextLevel;

    /**
     * Achievement role
     * @type {Role}
     */
    this.role = new Role(client, { id: data.roleId });
  }
}

module.exports = Achievement;
