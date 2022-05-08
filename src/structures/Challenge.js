const Base = require('./Base');
const ChallengeReward = require('./ChallengeReward');

/**
 * Represents a challenge.
 * @extends {Base}
 */
class Challenge extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Challenge description
     * @type {string}
     */
    this.description = data.description;

    /**
     * Challenge progress
     * @type {number}
     */
    this.progress = data.challengeProgress;

    /**
     * Challenge target
     * @type {string}
     */
    this.target = data.challengeTarget;

    /**
     * Challenge reward
     * @type {ChallengeReward}
     */
    this.reward = new ChallengeReward(client, data);
  }

  /**
   * Wether challenge completed
   * @type {boolean}
   * @readonly
   */
  get completed() {
    return this.progress === this.target;
  }

}

module.exports = Challenge;
