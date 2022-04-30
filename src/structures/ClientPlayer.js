const fetch = require('node-fetch');
const Player = require('./Player');
const Role = require('./Role');
const Inventory = require('./Inventory');
const EquippedItems = require('./EquippedItems');
const DailyRewards = require('./DailyRewards');
const ClientClan = require('./ClientClan');
const Challenge = require('./Challenge');
const BattlePass = require('./BattlePass');
const RankedSeason = require('./RankedSeason');
const Calendar = require('./Calendar');
const SentGift = require('./SentGift');
const ReceivedGift = require('./ReceivedGift');
const LimitedOffer = require('./LimitedOffer');
const LimitedCollection = require('./LimitedCollection');
const LimitedItems = require('./LimitedItems');
const { Genders } = require('../util/Constants');
const { getAuthenticationHeaders } = require('../util/Headers');

/**
 * Represents a client player.
 * @extends {Player}
 */
class ClientPlayer extends Player {
  constructor(client, data) {
    super(client, data);

    /**
     * Player xp.
     * @type {number}
     */
    this.xp = data.xpTotal;

    /**
     * Xp required to level up.
     * @type {number}
     */
    Object.defineProperty(this, 'requiredXp', { value: data.xpUntilNextLevel });

    /**
     * Player gender.
     * @type {number}
     */
    Object.defineProperty(this, 'gender', { value:
      data.gender === 'MALE' ? Genders.MALE
        : data.gender === 'FEMALE' ? Genders.FEMALE
        : Genders.OTHER
    });

    this.equippedItems.background = {
      id: data.equippedBackgroundId || null
    }
    this.equippedItems.loadingScreen = {
      id: data.equippedLoadingScreenId || null
    }

    /**
     * Role stats.
     * @type {Role[]}
     */
    this.stats.roles = Object.keys(this._roleStats).map(roleId => {
      const role = new Role(client, { id: roleId });
      role.loseCount = this._roleStats[roleId].loseCount;
      role.winCount = this._roleStats[roleId].winCount;
      return role;
    });

    /**
     * Player last ban.
     * @type {Object}
     */
    Object.defineProperty(this, 'lastBan', { value:
      data.bannedUntilTime ? {
        expirationTimestamp: new Date(data.bannedUntilTime).getTime(),
        reason: data.banReason,
        message: data.banReasonMsg
      } : null
    });

    /**
     * Are clan chat notifications disabled
     * @type {boolean}
     */
    this.options.clanChatNotificationsDisabled = data.notificationsDisabledClanChat;

    /**
     * Are clan action notifications disabled
     * @type {boolean}
     */
    this.options.clanActionNotificationsDisabled = data.notificationsDisabledClanActions;

    /**
     * Is receiving clan invites disabled.
     * @type {boolean}
     */
    this.options.clanInvitationsDisabled = data.noClanInvite;

    /**
     * Are badges hidden to other players.
     * @type {boolean}
     */
    this.options.badgesHidden = data.hideBadges;

    /**
     * Are role cards hidden to other players.
     * @type {boolean}
     */
    this.options.roleCardsHidden = data.roleCardsArePublic;

    if(data.deletionTime) {
      /**
       * Player deletion timestamp.
       * @type {number}
       */
      Object.defineProperty(this, 'deletionTimestamp', { value: new Date(data.deletionTime).getTime() });
    }
  }

  /**
   * Level tiers.
   * @returns {Array<number>}
   * @readonly
   */
  static get levelTiers() {
    return [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130,
    140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270,
    280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400, 410,
    420, 500, 600, 700, 800, 900, 1000];
  }

  /**
   * Developer announcements.
   * @returns {Array}
   */
  async fetchAnnouncements() {
    const request = await fetch(`${this.client.options.http.api.core}/announcements`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  /**
   * Equipped items.
   * @returns {EquippedItems}
   */
  async fetchEquippedItems() {
    const request = await fetch(`${this.client.options.http.api.core}/equippedItems`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new EquippedItems(this.client, response);
  }

  /**
   * Inventory.
   * @returns {Inventory}
   */
  async fetchInventory() {
    const request = await fetch(`${this.client.options.http.api.core}/inventory`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new Inventory(this.client, response);
  }

  /**
   * Clan invitations.
   * @returns {Array}
   */
  async fetchClanInvitations() {
    const request = await fetch(`${this.client.options.http.api.core}/clans/openRequests`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  /**
   * Friend invitation rewards.
   * @returns {Array}
   */
  async fetchFriendInvitationRewards() {
    const request = await fetch(`${this.client.options.http.api.core}/players/friendInvitationRewards`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  /**
   * Daily rewards.
   * @returns {DailyRewards}
   */
  async fetchDailyRewards() {
    const request = await fetch(`${this.client.options.http.api.core}/dailyRewards`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new DailyRewards(this.client, response);
  }

  /**
   * Golden spin rewards.
   * @returns {Array<Object>}
   */
  async fetchGoldenSpinRewards() {
    const request = await fetch(`${this.client.options.http.api.core}/rewards/goldenWheelItems`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  /**
   * Challenges.
   * @returns {Object<Array>}
   */
  async fetchChallenges() {
    const request = await fetch(`${this.client.options.http.api.core}/challenges/v2`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return {
      daily: response.dailyChallengeProgresses.map(challenge => new Challenge(this.client, challenge)),
      weekly: response.weeklyChallengeProgresses.map(challenge => new Challenge(this.client, challenge))
    }
  }

  /**
   * Battle pass.
   * @returns {BattlePass}
   */
  async fetchBattlePass() {
    const request = await fetch(`${this.client.options.http.api.core}/battlePass/seasonAndBattlePass`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new BattlePass(this.client, response);
  }

  /**
   * Fetch ranked season.
   * @returns {RankedSeason}
   */
  async fetchRankedSeason() {
    const request = await fetch(`${this.client.options.http.api.core}/ranked/seasonInfoCompact`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return new RankedSeason(this.client, response);
  }


  /**
   * Fetch calendar.
   * @returns {Calendar}
   */
  async fetchCalendar() {
    const request = await fetch(`${this.client.options.http.api.core}/calendars`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response.map(calendar => new Calendar(this.client, calendar));
  }

  /**
   * Sent gifts.
   * @returns {SentGift[]}
   */
  async fetchSentGifts() {
    const request = await fetch(`${this.client.options.http.api.core}/billing/gifts/sent`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response.map(gift => new SentGift(this.client, gift));
  }

  /**
   * Received gifts.
   * @returns {ReceivedGift[]}
   */
  async fetchReceivedGifts() {
    const request = await fetch(`${this.client.options.http.api.core}/billing/gifts/received`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response.map(gift => new ReceivedGift(this.client, gift));
  }

  /**
   * Fetch friend requests.
   * @returns {Object}
   */
  async fetchFriendRequests() {
    const request = await fetch(`${this.client.options.http.api.core}/friendRequests/pending`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

  /**
   * Fetch custom games owned roles.
   * @returns {Object}
   */
  async fetchCustomGamesOwnedRoles() {
    const request = await fetch(`${this.client.options.http.api.core}/customGames/ownRoles`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.client.token)
    });
    const response = await request.json();
    return response;
  }

 /**
  * Fetch limited offers.
  * @returns {Promise<LimitedOffer[]>}
  */
 async fetchLimitedOffers() {
   const request = await fetch(`${this.client.options.http.api.core}/billing/rotatingLimitedOffers`, {
     method: 'GET',
     headers: getAuthenticationHeaders(this.client.token)
   });
   const response = await request.json();
   return response.map(offer => {
     return offer.type === 'AVATAR_ITEMS' ? new LimitedItems(this.client, offer)
       : offer.type.endsWith('OUTFITS') ? new LimitedCollection(this.client, offer)
       : new LimitedOffer(this.client, offer)
   });
 }

}

module.exports = ClientPlayer;
