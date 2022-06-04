'use strict';

const Base = require('./Base');
const OwnedClanIcon = require('./OwnedClanIcon');

/**
 * Represents a base clan.
 * @extends {Base}
 * @abstract
 */
class BaseClan extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Clan id
     * @type {string}
     */
    this.id = data.clan.id;

    /**
     * Clan name
     * @type {string}
     */
    this.name = data.clan.name;

    /**
     * Clan tag
     * @type {?string}
     */
    this.tag = data.clan.tag ?? null;

    /**
     * Clan created timestamp
     * @type {number}
     */
    this.createdTimestamp = new Date(data.clan.creationTime).getTime();

    /**
     * Clan description
     * @type {?string}
     */
    this.description = data.clan.description ?? null;

    /**
     * Clan xp
     * @type {number}
     */
    this.xp = data.clan.xp;

    /**
     * Clan language
     * @type {string}
     */
    this.language = data.clan.language.toLowerCase();

    /**
     * Clan icon
     * @type {string}
     */
    this.icon = new OwnedClanIcon(client, {
      name: data.clan.icon,
      color: data.clan.iconColor,
    });

    /**
     * Clan join type
     * @type {string}
     */
    this.joinType = data.clan.joinType;

    /**
     * Clan member count
     * @type {number}
     */
    this.memberCount = data.clan.memberCount;

    /**
     * Clan required level to join
     * @type {number}
     */
    this.requiredLevel = data.clan.minLevel;

    /**
     * Clan started quest count
     * @type {number}
     */
    this.startedQuestCount = data.clan.questHistoryCount;
  }

  /**
   * Whether you can join the clan
   * @type {?boolean}
   * @readonly
   */
  get joinable() {
    return (
      this.client.player &&
      ['PUBLIC', 'JOIN_BY_REQUEST'].includes(this.joinType) &&
      this.memberCount < 50 &&
      this.client.player.level >= this.requiredLevel
    );
  }

  /**
   * Fetch the clan.
   * @returns {Clan}
   */
  fetch() {
    return this.client.clans.fetchById(this.id);
  }
}

module.exports = BaseClan;
