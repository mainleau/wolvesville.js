'use strict';

const BasePlayer = require('./BasePlayer');
const { ClanRanks } = require('../util/Constants');

/**
 * Represents a clan member.
 * @extends {BasePlayer}
 */
class ClanMember extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Member id
     * @type {string}
     */
    this.id = data.playerId;

    /**
     * Member username
     * @type {string}
     */
    this.username = data.username;

    /**
     * Member level
     * @type {number}
     */
    this.level = data.level;

    /**
     * Member status
     * @type {string}
     */
    this.status = data.playerStatus;

    /**
     * Member profile icon
     * @type {Object}
     */
    this.profileIcon = {
      id: data.profileIconId,
      color: data.profileIconColor,
    };

    /**
     * Xp the player brought to the clan
     * @type {number}
     */
    this.clanXp = data.xp;

    /**
     * Member status
     * @type {string}
     */
    this.clanStatus = data.status;

    /**
     * Member rank
     * @type {string}
     */
    this.rank =
      this.id === data.clan.leaderId ? ClanRanks.LEADER : data.coLeader ? ClanRanks.COLEADER : ClanRanks.MEMBER;

    /**
     * Member last online timestamp
     * @type {number}
     */
    this.lastOnlineTimestamp = new Date(data.lastOnline).getTime();
  }
}

module.exports = ClanMember;
