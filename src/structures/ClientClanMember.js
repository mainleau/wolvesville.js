'use strict';

const ClanMember = require('./ClanMember');

/**
 * Represents a client clan member.
 * @extends {ClanMember}
 */
class ClientClanMember extends ClanMember {
  constructor(client, data) {
    super(client, data);

    /**
     * Whether the member participate in clan quests
     * @type {boolean}
     */
    this.questParticipant = data.participateInClanQuests;
  }
}

module.exports = ClientClanMember;
