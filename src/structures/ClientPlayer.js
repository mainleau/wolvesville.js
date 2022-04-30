const fetch = require('node-fetch');
const Player = require('./Player');
const Routes = require('../util/Routes');
const Role = require('./Role');
const Announcement = require('./Announcement');
const Inventory = require('./Inventory');
const EquippedItems = require('./EquippedItems');
const ClanRequest = require('./ClanRequest');
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
   * @returns {number[]}
   * @readonly
   */
  static get levelTiers() {
    return [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130,
    140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270,
    280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390, 400, 410,
    420, 500, 600, 700, 800, 900, 1000];
  }

  /**
   * Fetch developer announcements.
   * @returns {Announcement[]}
   */
  async fetchAnnouncements() {
    const response = await this.client.rest.get(Routes.ANNOUNCEMENTS());
    return response.map(announcement => new Announcement(this.client, announcement));
  }

  /**
   * Fetch equipped items.
   * @returns {EquippedItems}
   */
  async fetchEquippedItems() {
    const response = await this.client.rest.get(Routes.EQUIPPED_ITEMS());
    return new EquippedItems(this.client, response);
  }

  /**
   * Fetch inventory.
   * @returns {Inventory}
   */
  async fetchInventory() {
    const response = await this.client.rest.get(Routes.INVENTORY());
    return new Inventory(this.client, response);
  }

  /**
   * Fetcn clan requests.
   * @returns {ClanRequest[]}
   */
  async fetchClanRequests() {
    const response = await this.client.rest.get(Routes.CLAN_REQUESTS());
    return response.map(clan => new ClanRequest(this.client, clan));
  }

  /**
   * Friend invitation rewards.
   * @returns {Array}
   */
  async fetchFriendInvitationRewards() {
    const response = await this.client.rest.get(Routes.FRIEND_INVITATION_REWARDS());
    return response;
  }

  /**
   * Daily rewards.
   * @returns {DailyRewards}
   */
  async fetchDailyRewards() {
    const response = await this.client.rest.get(Routes.DAILY_REWARDS());
    return new DailyRewards(this.client, response);
  }

  /**
   * Golden wheel rewards.
   * @returns {Promise<Object[]>}
   */
  async fetchGoldenWheelRewards() {
    const response = await this.client.rest.get(Routes.GOLDEN_WHEEL_REWARDS());
    return response;
  }

  /**
   * Challenges.
   * @returns {Object<Array>}
   */
  async fetchChallenges() {
    const response = await this.client.rest.get(Routes.CHALLENGES());
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
    const response = await this.client.rest.get(Routes.BATTLE_PASS_SEASON());
    return new BattlePass(this.client, response);
  }

  /**
   * Fetch ranked season.
   * @returns {RankedSeason}
   */
  async fetchRankedSeason() {
    const response = await this.client.rest.get(Routes.RANKED_SEASON());
    return new RankedSeason(this.client, response);
  }


  /**
   * Fetch calendars.
   * @returns {Calendar}
   */
  async fetchCalendars() {
    const response = await this.client.rest.get(Routes.CALENDARS());
    return response.map(calendar => new Calendar(this.client, calendar));
  }

  /**
   * Sent gifts.
   * @returns {SentGift[]}
   */
  async fetchSentGifts() {
    const response = await this.client.rest.get(Routes.SENT_GIFTS());
    return response.map(gift => new SentGift(this.client, gift));
  }

  /**
   * Received gifts.
   * @returns {ReceivedGift[]}
   */
  async fetchReceivedGifts() {
    const response = await this.client.rest.get(Routes.RECEIVED_GIFTS());
    return response.map(gift => new ReceivedGift(this.client, gift));
  }

  /**
   * Fetch friend requests.
   * @returns {Object}
   */
  async fetchFriendRequests() {
    const response = await this.client.rest.get(Routes.FRIEND_REQUESTS());
    return response;
  }

  /**
   * Fetch custom games owned roles.
   * @returns {Object}
   */
  async fetchCustomGamesOwnedRoles() {
    const response = await this.client.rest.get(Routes.CUSTOM_GAME_OWNED_ROLES());
    return response;
  }

 /**
  * Fetch limited offers.
  * @returns {Promise<LimitedOffer[]>}
  */
 async fetchLimitedOffers() {
  const response = await this.client.rest.get(Routes.LIMITED_OFFERS());
   return response.map(offer => {
     return offer.type === 'AVATAR_ITEMS' ? new LimitedItems(this.client, offer)
       : offer.type.endsWith('OUTFITS') ? new LimitedCollection(this.client, offer)
       : new LimitedOffer(this.client, offer)
   });
 }

}

module.exports = ClientPlayer;
