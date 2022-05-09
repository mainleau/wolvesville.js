'use strict';

const Base = require('./Base');
const ClanQuest = require('./ClanQuest');

/**
 * Represents available clan quests.
 * @extends {Base}
 */
class AvailableClanQuests extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Clan quests
     * @type {Array<ClanQuest>}
     */
    this.quests = data.quests.map(quest => new ClanQuest(client, quest));

    /**
     * Base gold price
     * @type {number}
     */
    this.baseGoldPrice = data.baseGolPrice;

    /**
     * Base gem price
     * @type {number}
     */
    this.baseGemPrice = data.baseGemPrice;

    /**
     * Base gold price to shuffle quests
     * @type {number}
     */
    this.baseGoldPriceShuffleQuests = data.baseGoldPriceShuffleQuests;

    /**
     * Base gold price to skip quest wait
     * @type {number}
     */
    this.baseGoldPriceSkipQuestWait = data.baseGoldPriceSkipQuestWait;

    /**
     * Member gem price
     * @type {number}
     */
    this.memberGemPrice = data.memberGemPrice;

    /**
     * Member gold price
     * @type {number}
     */
    this.memberGoldPrice = data.memberGoldPrice;

    /**
     * Member gold price to shuffle quests
     * @type {number}
     */
    this.memberGoldPriceShuffleQuests = data.memberGoldPriceShuffleQuests;

    /**
     * Member gold price to shuffle quests
     * @type {number}
     */
    this.memberGoldPriceSkipQuestWait = data.memberGoldPriceSkipQuestWait;

    /**
     * Clan quests reset timestamp
     * @type {number}
     */
    this.resetTimestamp = new Date(data.endTime).getTime();
  }
}

module.exports = AvailableClanQuests;
