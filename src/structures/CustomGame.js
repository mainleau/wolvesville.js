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
     * @type {string[]}
     */
    this.roles = data.roles;

    /**
     * Game player count
     * @type {number}
     */
    this.playerCount = data.playerCount;

    /**
     * Custom game settings.
     * @typedef {Object} CustomGameSettings
     * @property {number} nightDuration Night period duration
     * @property {number} discussionDuration Discussion period duration
     * @property {number} voteDuration Vote period duration
     * @property {boolean} xpEnabled Whether regular xp is enabled
     * @property {boolean} voiceEnabled Whether voice mode is enabled
     */

    /**
     * Game settings
     * @type {CustomGameSettings}
     */
    this.settings = {
      nightDuration: data.nightDurationInMs,
      discussionDuration: data.dayDiscussionDurationInMs,
      voteDuration: data.dayVotingDurationInMs,
      xpEnabled: data.regularXp,
      voiceEnabled: data.voiceEnabled,
    };
  }
}

module.exports = CustomGame;
