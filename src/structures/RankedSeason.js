const Base = require('./Base');
const RankedAward = require('./RankedAward.js');

/**
 * Represents a ranked season.
 * @extends {Base}
 */
class RankedSeason extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Season id
     * @type {string}
     */
    this.id = data.season.id;

    /**
     * Ranked season
     * @type {number}
     */
    this.season = data.season.number + 1;

    /**
     * Season awards
     * @type {RankedAward[]}
     */
     this.awards = data.seasonAwards.map(award => new RankedAward(client, award));

     /**
      * Starting skill points
      * @type {number}
      */
     this.startingSkillPoints = data.startSkillDefault;

     /**
      * High rank starting skill points
      * @type {number}
      */
     this.highRankStartingSkillPoints = data.startSkillLevel1;

     /**
      * High rank required skill points
      * @type {number}
      */
     this.highRankRequiredSkillPoints = data.startSkillLevel1RequiredSkill;

     /**
      * Season duration
      * @type {number}
      */
    this.duration = Math.round((new Date(data.season.endTime) - new Date(data.season.startTime)) / (1000 * 60 * 60 * 24));

    /**
     * Season start timestamp
     * @type {number}
     */
    this.startTimestamp = new Date(data.season.startTime).getTime();

    /**
     * Season end timestamp
     * @type {number}
     */
    this.endTimestamp = new Date(data.season.endTime).getTime();

    /**
     * Wether season is ended
     * @type {boolean}
     */
    this.ended = data.season.finished;
  }
}

module.exports = RankedSeason;
