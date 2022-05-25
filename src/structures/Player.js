'use strict';

const { Collection } = require('@discordjs/collection');
const AvatarSlot = require('./AvatarSlot');
const BasePlayer = require('./BasePlayer');
const EquippedItems = require('./EquippedItems');
const RoleCard = require('./RoleCard');
const Routes = require('../util/Routes');

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
     * @type {EquippedItems}
     */
    this.equippedItems = new EquippedItems(client, {
      profileIcon: {
        id: data.equippedProfileIconId,
        color: data.equippedProfileIconColor,
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

  /**
   * Fetch player clan.
   * @returns {Promise<Clan|ClientClan>}
   */
  fetchClan() {
    return this.constructor.name === Player
      ? this.client.clans.fetchByUsername(this.username)
      : this.client.clans.fetchOwn();
  }

  /**
   * Fetch player avatar slots.
   * @returns {Promise<Collection<number, AvatarSlot>>}
   */
  async fetchAvatarSlots() {
    const response = await this.client.rest.get(Routes.AVATAR_SLOTS(this.id));

    const data = response.map(
      avatarSlot =>
        new AvatarSlot(
          this.client,
          Object.assign(avatarSlot, {
            id: avatarSlot.renderedAvatarImage.fileName.slice(0, -4),
            skinColor: parseInt(avatarSlot.skinColor.slice(6)) - 1,
          }),
        ),
    );
    return data.reduce((col, avatarSlot) => col.set(avatarSlot.slot, avatarSlot), new Collection());
  }

  /**
   * Fetch player badges.
   * @returns {Promise<Collection<string, AvatarItem>>}
   */
  async fetchBadges() {
    const response = await this.client.rest.get(Routes.BADGES(this.id));

    const data = response.ids.map(badgeId => this.client.items.avatarItems.cache.get(badgeId));
    return data.reduce((col, badge) => col.set(badge.id, badge), new Collection());
  }

  /**
   * Fetch player role cards.
   * @returns {Promise<Collection<string, RoleCard>>}
   */
  async fetchRoleCards() {
    const response = await this.client.rest.get(Routes.ROLE_CARDS(this.own, this.id));

    const data = response.map(roleCard => new RoleCard(this.client, roleCard));
    return data.reduce((col, roleCard) => col.set(roleCard.id, roleCard), new Collection());
  }

  /**
   * Whether the player is the client player
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
