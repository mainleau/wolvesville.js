'use strict';

const { Collection } = require('@discordjs/collection');
const fetch = require('node-fetch');
const AvatarSlot = require('./AvatarSlot');
const BasePlayer = require('./BasePlayer');
const RoleCard = require('./RoleCard');
const { getAuthenticationHeaders } = require('../util/Headers');

/**
 * Represents a player.
 * @extends {BasePlayer}
 */
class Player extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Player id
     * @type {string}
     */
    this.id = data.id;

    /**
     * Player username
     * @type {string}
     */
    this.username = data.username;

    /**
     * Player clan tag
     * @type {?string}
     */
    this.clanTag = data.clanTag || null;

    /**
     * Player personal message
     * @type {?string}
     */
    this.personalMessage = data.personalMsg || null;

    /**
     * Player level
     * @type {number}
     */
    this.level = data.level;

    /**
     * Player status
     * @type {string}
     */
    Object.defineProperty(this, 'status', { value: data.playerStatus });

    /**
     * Number of roses the player received
     * @type {number}
     */
    Object.defineProperty(this, 'receivedRoses', { value: data.receivedRoses || 0 });

    /**
     * Number of roses the player sent
     * @type {number}
     */
    Object.defineProperty(this, 'sentRoses', { value: data.sentRoses || 0 });

    /**
     * Player creation timestamp
     * @type {?string}
     */
    Object.defineProperty(this, 'creationTimestamp', { value: new Date(data.creationTime).getTime() || null });

    /**
     * Player last online timestamp
     * @type {string}
     */
    Object.defineProperty(this, 'lastOnlineTimestamp', { value: new Date(data.lastOnline).getTime() });

    /**
     * Player equipped items
     * @type {Object}
     */
    Object.defineProperty(this, 'equippedItems', {
      value: {
        icon: {
          id: data.equippedProfileIconId,
          color: data.equippedProfileIconColor,
        },
      },
    });

    Object.defineProperty(this, '_roleStats', { value: data.playerStats.roleStats });

    /**
     * Player stats
     * @type {Object}
     */
    Object.defineProperty(this, 'stats', {
      value: {
        wonGameCount: Object.values(this._roleStats).reduce((t, n) => t + n.winCount, 0),
        lostGameCount: Object.values(this._roleStats).reduce((t, n) => t + n.loseCount, 0),
        finishedGameCount: data.playerStats.finishedGamesCount,
        gamesSurvivedCount: data.playerStats.gamesSurvivedCount,
        gamesKilledCount: data.playerStats.gamesKilledCount,
        gamesExitedCount: data.playerStats.exitGameAfterDeathCount,
        fledGameCount: data.playerStats.exitGameBySuicideCount,
        minutesPlayedInGame: data.playerStats.totalPlayTimeInMinutes,
        ranked: {
          seasonSkill: data.seasonSkill !== -1 ? data.seasonSkill : null,
          seasonSkillRecord: data.seasonMaxSkill !== -1 ? data.seasonMaxSkill : null,
          seasonFinalRankRecord: data.seasonBestRank !== -1 ? data.seasonBestRank : null,
          seasonPlayedCount: data.seasonPlayedCount,
        },
      },
    });

    /**
     * Player options
     * @type {Object}
     */
    Object.defineProperty(this, 'options', {
      value: {
        clanTagHidden: data.hideClanTag,
      },
    });
  }

  fetchClan() {
    return this.constructor.name === Player
      ? this.client.clans.fetchByUsername(this.username)
      : this.client.clans.fetchOwn();
  }

  async fetchAvatarSlots() {
    const request = await fetch(`${this.client.options.http.api.core}/inventory/slots/${this.id}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token),
    });
    const response = await request.json();

    const fetchedAvatarSlots = new Collection();

    for (const avatarSlot of response.values()) {
      fetchedAvatarSlots.set(avatarSlot.slot, new AvatarSlot(this.client, avatarSlot));
    }

    return fetchedAvatarSlots;
  }

  async fetchBadges() {
    const request = await fetch(`${this.client.options.http.api.core}/players/${this.id}/badgeIdsV2`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token),
    });
    const response = await request.json();
    return response.ids;
  }

  async fetchRoleCards() {
    const request = await fetch(`${this.client.options.http.api.core}/roleCards/owned/${!this.own ? this.id : ''}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token),
    });
    const response = await request.json();

    const fetchedRoleCards = new Collection();

    for (const roleCard of response) {
      fetchedRoleCards.set(roleCard.id, new RoleCard(this.client, roleCard));
    }

    return fetchedRoleCards;
  }

  /**
   * Wether the player is the client player
   * @type {boolean}
   * @readonly
   */
  get own() {
    return this.constructor !== Player;
  }

  /**
   * Clan tag and username
   * @type {string}
   * @readonly
   */
  get clanTagAndUsername() {
    return this.clanTag ? `${this.clanTag} | ${this.username}` : this.username;
  }

  /**
   * Wether the player is online
   * @type {boolean}
   * @readonly
   */
  get online() {
    return this.lastOnlineTimestamp + 10 * 60 * 1000 > Date.now();
  }

  /**
   * Games played count
   * @type {number}
   * @readonly
   */
  get gamesPlayedCount() {
    return this.stats.wonGameCount + this.stats.lostGameCount + this.stats.fledGameCount;
  }
}

module.exports = Player;
