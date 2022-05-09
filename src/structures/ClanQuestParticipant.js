'use strict';

const BasePlayer = require('./BasePlayer');

/**
 * Represents a quest participant.
 * @extends {BasePlayer}
 */
class ClanQuestParticipant extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Participant id
     * @type {string}
     */
    this.id = data.playerId;

    /**
     * Participant username
     * @type {string}
     */
    this.username = data.username;

    /**
     * Xp the participant brought for the quest
     * @type {number}
     */
    this.xp = data.xp;
  }
}

module.exports = ClanQuestParticipant;
