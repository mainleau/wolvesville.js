'use strict';

const Base = require('./Base');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a calendar reward.
 * @extends {Base}
 */
class CalendarReward extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Reward type
     * @type {string}
     */
    this.type = ItemTypes[data.type];

    /**
     * Reward amount
     * @type {number}
     */
    this.amount = data.amount;

    this.item = client.items.resolve(
      data.avatarItemId || data.loadingScreenId || data.backgroundId || data.emojiId,
      this.type,
    );

    /**
     * Reward day
     * @type {number}
     */
    this.day = data.day;
  }
}

module.exports = CalendarReward;
