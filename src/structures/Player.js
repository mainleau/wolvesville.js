const BasePlayer = require('./BasePlayer');
const AvatarSlot = require('./AvatarSlot');
const ClanManager = require('../managers/ClanManager');
const RoleCard = require('./RoleCard');
const { Collection } = require('@discordjs/collection');
const { getAuthenticationHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Represents a player.
 * @extends {BasePlayer}
 */
class Player extends BasePlayer {
  constructor(client, data) {
    super(client);

    /**
     * Player id.
     * @type {string}
     */
    this.id = data.id;

    /**
     * Player username.
     * @type {string}
     */
    this.username = data.username;

    /**
     * Player level.
     * @type {number}
     */
    this.level = data.level;

    /**
     * Player clan tag.
     * @type {?string}
     */
    this.clanTag = data.clanTag || null;

    /**
     * Player status.
     * @type {string}
     */
    this.status = data.playerStatus;

    /**
     * Player personal message.
     * @type {?string}
     */
    this.personalMessage = data.personalMsg || null;

    /**
     * Number of roses the player received.
     * @type {number}
     */
    this.receivedRoses = data.receivedRoses || 0;

    /**
     * Number of roses the player sent.
     * @type {number}
     */
    this.sentRoses = data.sentRoses || 0;

    /**
     * Player creation timestamp.
     * @type {?string}
     */
    this.creationTimestamp = new Date(data.creationTime).getTime() || null;

    /**
     * Player last online timestamp.
     * @type {string}
     */
    this.lastOnlineTimestamp = new Date(data.lastOnline).getTime();

    /**
     * Player equipped items.
     * @type {Object}
     */
    this.equippedItems = {
      profileIcon: {
        id: data.equippedProfileIconId,
        color: data.equippedProfileIconColor,
      }
    }

    Object.defineProperty(this, '_roleStats', { value: data.playerStats.roleStats });

    /**
     * Player stats.
     * @type {Object}
     */
    this.stats = {
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
        seasonPlayedCount: data.seasonPlayedCount
      }
    }

    /**
     * Player options.
     * @type {Object}
     */
    this.options = {
      clanTagHidden: data.hideClanTag
    }
  }

  async fetchClan() {
    return this.constructor.name === Player
      ? await this.client.clans.fetchByUsername(this.username)
      : await this.client.clans.fetchOwn();
  }

  async fetchAvatarSlots() {
    const request = await fetch(`${this.client.options.http.api.core}/inventory/slots/${this.id}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();

    const fetchedAvatarSlots = new Collection();

    for (const avatarSlot of response.values()) {
      fetchedAvatarSlots.set(
        avatarSlot.slot,
        new AvatarSlot(this.client, avatarSlot)
      );
    }

    return fetchedAvatarSlots;
  }

  async fetchBadges() {
    const request = await fetch(`${this.client.options.http.api.core}/players/${this.id}/badgeIdsV2`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response.ids;
  }

  async fetchRoleCards() {
    const request = await fetch(`${this.client.options.http.api.core}/roleCards/owned/${!this.own ? this.id : ''}`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();

    const fetchedRoleCards = new Collection();

    for (const roleCard of response) {
      fetchedRoleCards.set(
        roleCard.id,
        new RoleCard(this.client, roleCard)
      );
    }

    return fetchedRoleCards;
  }

  /**
   * Wether the player is the client player.
   * @type {boolean}
   * @readonly
   */
  get own() {
    return this.constructor !== Player;
  }

  get clanTagAndUsername() {
    return this.clanTag ? this.clanTag + '|' + this.username : this.username;
  }

  get online() {
    return this.lastOnlineTimestamp + 10 * 60 * 1000 > Date.now();
  }

  get gamesPlayedCount() {
    return this.stats.wonGameCount + this.stats.lostGameCount + this.stats.fledGameCount;
  }

}

module.exports = Player;
