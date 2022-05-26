'use strict';

const ClanQuest = require('./ClanQuest');
const ClanQuestParticipant = require('./ClanQuestParticipant');

/**
 * Represents an active clan quest.
 * @extends {ClanQuest}
 */
class ActiveClanQuest extends ClanQuest {
  constructor(client, data) {
    super(client, data.quest);

    /**
     * Quest tier
     * @type {number}
     */
    this.tier = data.tier + 1;

    /**
     * Quest xp
     * @type {number}
     */
    this.xp = data.xp;

    /**
     * Quest tier start timestamp
     * @type {number}
     */
    this.tierStartTimestamp = new Date(data.tierStartTime).getTime();

    /**
     * Quest tier end timestamp
     * @type {number}
     */
    this.tierEndTimestamp = new Date(data.tierEndTime).getTime();

    /**
     * Whether quest tier completed
     * @type {boolean}
     */
    this.tierCompleted = data.tierFinished;

    /**
     * Quest participants
     * @type {ClanQuestParticipant[]}
     */
    this.participants = data.participants.map(participant => new ClanQuestParticipant(client, participant));

    /**
     * Required xp per quest tier
     * @type {number}
     */
    this.requiredXp = data.xpPerReward;

    /**
     * Whether quest duration extension is claimed
     * @type {boolean}
     */
    this.durationExtensionClaimed = data.claimedTime;
  }

  /**
   * Quest total xp
   * @type {number}
   * @readonly
   */
  get totalXp() {
    return Object.values(this.participants).reduce((a, v) => a.xp + v.xp);
  }

  /**
   * Quest tier xp
   * @type {number}
   * @readonly
   */
  get tierXp() {
    return this.xp % this.requiredXp;
  }
}

module.exports = ActiveClanQuest;
