'use strict';

const { Collection } = require('@discordjs/collection');
const Achievement = require('./Achievement');
const AvatarSlot = require('./AvatarSlot');
const BasePlayer = require('./BasePlayer');
const EquippedItems = require('./EquippedItems');
const RoleCard = require('./RoleCard');
const { ItemTypes } = require('../util/Constants');
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
    this.clanTag = data.clanTag ?? null;

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
    this.status = data.playerStatus;

    /**
     * Number of roses the player received
     * @type {number}
     */
    this.receivedRoses = data.receivedRoses ?? 0;

    /**
     * Number of roses the player sent
     * @type {number}
     */
    this.sentRoses = data.sentRoses ?? 0;

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

    /**
     * Number of games played where the player stayed until the end
     * @type {number}
     */
    this.finishedGameCount = data.finishedGamesCount;

    /**
     * Number of games the player has survived to the end
     * @type {number}
     */
    this.gamesSurvivedCount = data.gamesSurvivedCount;

    /**
     * Number of games where the player was killed
     * @type {number}
     */
    this.gamesKilledCount = data.gamesKilledCount;

    /**
     * Number of games the player left before the end
     * @type {number}
     */
    this.gamesLeftCount = data.exitGameAfterDeathCount;

    /**
     * Number of games the player has fled
     * @type {number}
     */
    this.fledGameCount = data.exitGameBySuicideCount;

    /**
     * Number of hours spent in game by the player
     * @type {number}
     */
    this.playTime = data.totalPlayTimeInMinutes;

    /**
     * Ranked season skill points
     * @type {?number}
     */
    this.seasonSkill = data.seasonSkill !== -1 ? data.seasonSkill : null;

    /**
     * Ranked season skill points record
     * @type {?number}
     */
    this.skillRecord = data.seasonMaxSkill !== -1 ? data.seasonMaxSkill : null;

    /**
     * Ranked final rank record
     * @type {?number}
     */
    this.rankRecord = data.seasonBestRank !== -1 ? data.seasonBestRank : null;

    /**
     * Ranked season played count
     * @type {number}
     */
    this.seasonPlayedCount = data.seasonPlayedCount;

    /**
     * Player creation timestamp
     * @type {?number}
     */
    this.creationTimestamp = new Date(data.creationTime).getTime() || null;

    /**
     * Player last online timestamp
     * @type {number}
     */
    this.lastOnlineTimestamp = new Date(data.lastOnline).getTime();

    /**
     * Options for a player.
     * @typedef {Object} PlayerOptions
     * @property {boolean} clanTagHidden Whether the player has hidden their clan tag
     * @property {boolean} clanChatNotificationsDisabled Whether the player disabled their clan chat notifications
     * @property {boolean} clanActionNotificationsDisabled Whether the player disabled their clan actions notifications
     * @property {boolean} clanInvitesDisabled Whether the player has disabled the receipt of clan invites
     */

    /**
     * Player options
     * @type {PlayerOptions}
     */
    this.options = {
      clanTagHidden: data.hideClanTag,
    };
  }

  /**
   * Fetch player clan.
   * @returns {Promise<Clan>}
   */
  fetchClan() {
    return this.client.clans.fetchByPlayerId(this.id);
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

    const data = response.ids.map(badgeId => this.client.items.resolve(badgeId, ItemTypes.AVATAR_ITEM));
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
   * Player role stats.
   * @typedef {Object} PlayerRoleStats
   * @property {number} villageWinCount Village win count
   * @property {number} villageLoseCount Village lose count
   * @property {number} werewolfWinCount Werewolf win count
   * @property {number} werewolfLoseCount Werewolf lose count
   * @property {number} votingWinCount Voting win count
   * @property {number} votingLoseCount Voting lose count
   * @property {number} soloWinCount Solo win count
   * @property {number} soloLoseCount Solo lose count
   * @property {number} totalWinCount Total win count
   * @property {number} totalLoseCount Total win count
   * @property {number} totalTieCount Total win count
   * @property {Achievement[]} achievements Achievements
   */

  /**
   * Fetch player role stats.
   * @returns {Promise<PlayerRoleStats>}
   */
  async fetchRoleStats() {
    const response = await this.client.rest.get(Routes.ROLE_STATS_SUMMARY(this.id));
    return {
      villageWinCount: response.villageWinCount,
      villageLoseCount: response.villageLoseCount,
      werewolfWinCount: response.werewolfWinCount,
      werewolfLoseCount: response.werewolfLoseCount,
      votingWinCount: response.votingWinCount,
      votingLoseCount: response.votingLoseCount,
      soloWinCount: response.soloWinCount,
      soloLoseCount: response.soloLoseCount,
      totalWinCount: response.totalWinCount,
      totalLoseCount: response.totalLoseCount,
      totalTieCount: response.totalTieCount,
      achievements: response.achievements.map(achievement => new Achievement(this.client, achievement)),
    };
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
