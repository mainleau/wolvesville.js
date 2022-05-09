'use strict';

const Base = require('./Base');
const CustomGameHost = require('./CustomGameHost');

/**
 * Represents a custom game.
 * @extends {Base}
 */
class CustomGame extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Game id
     * @type {string}
     */
    this.id = data.gameId;

    /**
     * Game name
     * @type {string}
     */
    this.name = data.name;

    /**
     * Game host
     * @type {CustomGameHost}
     */
    this.host = new CustomGameHost(client, {
      username: data.hostName,
    });

    /**
     * Game language
     * @type {string}
     */
    this.language = data.language;

    /**
     * Game roles
     * @type {Array<string>}
     */
    this.roles = data.roles;

    /**
     * Game player count
     * @type {number}
     */
    this.playerCount = data.playerCount;

    /**
     * Does the game give regular xp
     * @type {number}
     */
    this.xp = data.regularXp;

    /**
     * Game parameters
     * @type {Object}
     */
    this.parameters = {
      nightDuration: data.nightDurationInMs,
      dayDiscussionDuration: data.dayDiscussionDurationInMs,
      dayVoteDuration: data.dayVotingDurationInMs,
      voiceEnabled: data.voiceEnabled,
    };
  }
}

module.exports = CustomGame;
