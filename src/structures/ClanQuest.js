const Base = require('./Base');
const ClanQuestReward = require('./ClanQuestReward');

/**
 * Represents a clan quest.
 * @extends {Base}
 */
class ClanQuest extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Quest name.
     * @type {string}
     */
    this.name = data.imgName;

    /**
     * Quest id.
     * @type {string}
     */
    this.id = data.id;

    /**
     * Quest type.
     * @type {number}
     */
    this.type = data.isPurchasableWithGems ? 1 : 0;

    /**
     * Quest rewards.
     * @type {Array<ClanQuestReward>}
     */
    this.rewards = data.rewards.map(reward => new ClanQuestReward(client, reward));
  }

  /**
   * Quest image url.
   * @type {string}
   * @readonly
   */
  get imageURL() {
    return `${this.client.options.http.cdn}/promotions/${this.name}.jpg`;
  }

}

module.exports = ClanQuest;
