'use strict';

const Base = require('./Base');
const ClanQuestReward = require('./ClanQuestReward');
const { ItemTypes } = require('../util/Constants');

/**
 * Represents a clan quest.
 * @extends {Base}
 */
class ClanQuest extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Quest name
     * @type {string}
     */
    this.name = data.imgName;

    /**
     * Quest id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Quest type
     * @type {number}
     */
    this.type = data.isPurchasableWithGems ? ItemTypes.GEM : ItemTypes.GOLD;

    /**
     * Quest rewards
     * @type {ClanQuestReward[]}
     */
    this.rewards = data.rewards.map(reward => new ClanQuestReward(client, reward));
  }

  /**
   * Quest image url
   * @type {string}
   * @readonly
   */
  get imageURL() {
    return `${this.client.options.http.cdn.items}/promotions/${this.name}.jpg`;
  }
}

module.exports = ClanQuest;
