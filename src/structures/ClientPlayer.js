const { Collection } = require('@discordjs/collection');
const Player = require('./Player');
const Role = require('./Role');
const Announcement = require('./Announcement');
const Inventory = require('./Inventory');
const EquippedItems = require('./EquippedItems');
const FriendReferralReward = require('./FriendReferralReward');
const ClanRequest = require('./ClanRequest');
const DailyRewards = require('./DailyRewards');
const ClientClan = require('./ClientClan');
const Challenge = require('./Challenge');
const BattlePassSeason = require('./BattlePassSeason');
const GoldenWheelReward = require('./GoldenWheelReward');
const RankedSeason = require('./RankedSeason');
const Calendar = require('./Calendar');
const SentGift = require('./SentGift');
const ReceivedGift = require('./ReceivedGift');
const LimitedOffer = require('./LimitedOffer');
const SentFriendRequest = require('./SentFriendRequest');
const ReceivedFriendRequest = require('./ReceivedFriendRequest');
const LimitedCollection = require('./LimitedCollection');
const LimitedItems = require('./LimitedItems');
const Routes = require('../util/Routes');
const { Genders } = require('../util/Constants');

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
     * @type {string}
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

    this.options.clanChatNotificationsDisabled = data.notificationsDisabledClanChat;
    this.options.clanActionNotificationsDisabled = data.notificationsDisabledClanActions;
    this.options.clanInvitationsDisabled = data.noClanInvite;


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
   * @type {number[]}
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
   * @returns {Promise<Announcement[]>}
   */
  async fetchAnnouncements() {
    const data = await this.client.rest.get(Routes.ANNOUNCEMENTS());
    return data.map(announcement => new Announcement(this.client, announcement));
  }

  /**
   * Fetch equipped items.
   * @returns {Promise<EquippedItems>}
   */
  async fetchEquippedItems() {
    if(!this.client.items.avatarItems.cache.size) await this.client.items.fetch();

    const data = await this.client.rest.get(Routes.EQUIPPED_ITEMS());
    return new EquippedItems(this.client, data);
  }

  /**
   * Fetch inventory.
   * @returns {Promise<Inventory>}
   */
  async fetchInventory() {
    if(!this.client.items.avatarItems.cache.size) await this.client.items.fetch();

    const data = await this.client.rest.get(Routes.INVENTORY());
    return new Inventory(this.client, data);
  }

  /**
   * Fetcn clan requests.
   * @returns {Promise<ClanRequest[]>}
   */
  async fetchClanRequests() {
    const response = await this.client.rest.get(Routes.CLAN_REQUESTS());
    return response.map(clan => new ClanRequest(this.client, clan));
  }

  /**
   * Fetch friend referral rewards.
   * @returns {Promise<FriendReferralReward[]>}
   */
  async fetchFriendReferralRewards() {
    const data = await this.client.rest.get(Routes.FRIEND_REFERRAL_REWARDS());
    return data.friendInvitationRewards.map((reward, index) => {
      return new FriendReferralReward(this.client, Object.assign(reward, {
        claimed: data.finished > index
      }));
    });
  }

  /**
   * Fetch daily rewards.
   * @returns {Promise<DailyRewards>}
   */
  async fetchDailyRewards() {
    const data = await this.client.rest.get(Routes.DAILY_REWARDS());
    return new DailyRewards(this.client, data);
  }

  /**
   * Fetch golden wheel rewards.
   * @returns {Promise<Object[]>}
   */
  async fetchGoldenWheelRewards() {
    const data = await this.client.rest.get(Routes.GOLDEN_WHEEL_REWARDS());
    return data.map(reward => new GoldenWheelReward(this.client, reward));
  }

  /**
   * Fetch challenges.
   * @returns {Promise<Object>}
   */
  async fetchChallenges() {
    const data = await this.client.rest.get(Routes.CHALLENGES());
    return {
      daily: data.dailyChallengeProgresses.map(challenge => new Challenge(this.client, challenge)),
      weekly: data.weeklyChallengeProgresses.map(challenge => new Challenge(this.client, challenge))
    }
  }

  /**
   * Fetch battle pass season.
   * @returns {Promise<BattlePassSeason>}
   */
  async fetchBattlePassSeason() {
    if(!this.client.items.avatarItems.cache.size) await this.client.items.fetch();

    const data = await this.client.rest.get(Routes.BATTLE_PASS_SEASON());
    return new BattlePassSeason(this.client, data);
  }

  /**
   * Fetch ranked season.
   * @returns {Promise<RankedSeason>}
   */
  async fetchRankedSeason() {
    const response = await this.client.rest.get(Routes.RANKED_SEASON());
    return new RankedSeason(this.client, response);
  }

  /**
   * Fetch calendars.
   * @returns {Promise<Calendar[]>}
   */
  async fetchCalendars() {
    if(!this.client.items.avatarItems.cache.size) await this.client.items.fetch();

    const response = await this.client.rest.get(Routes.CALENDARS());
    return response.map(calendar => new Calendar(this.client, calendar));
  }

  /**
   * Fetch sent gifts.
   * @returns {Promise<SentGift[]>}
   */
  async fetchSentGifts() {
    const response = await this.client.rest.get(Routes.SENT_GIFTS());
    return response.map(gift => new SentGift(this.client, gift));
  }

  /**
   * Fetch received gifts.
   * @returns {Promise<ReceivedGift[]>}
   */
  async fetchReceivedGifts() {
    const response = await this.client.rest.get(Routes.RECEIVED_GIFTS());
    return response.map(gift => new ReceivedGift(this.client, gift));
  }

  /**
   * Fetch friend requests.
   * @returns {Promise<Collection<string, SentFriendRequest[]|ReceivedFriendRequest[]>>}
   */
  async fetchFriendRequests() {
    const response = await this.client.rest.get(Routes.FRIEND_REQUESTS());

    const data = response.map(request => {
      return request.originator.id === this.id
        ? new SentFriendRequest(this.client, request)
        : new ReceivedFriendRequest(this.client, request);
    });
    return data.reduce((col, request) => col.set(request.id, request), new Collection());
  }

  /**
   * Fetch custom games owned roles.
   * @returns {Role[]}
   */
  async fetchCustomGamesOwnedRoles() {
    const response = await this.client.rest.get(Routes.CUSTOM_GAME_OWNED_ROLES());
    return response.map(id => new Role(this.client, { id }));
  }

 /**
  * Fetch limited offers.
  * @returns {Promise<LimitedOffer[]>}
  */
 async fetchLimitedOffers() {
  if(!this.client.items.avatarItems.cache.size) await this.client.items.fetch();

  const response = await this.client.rest.get(Routes.LIMITED_OFFERS());
   return response.map(offer => {
     return offer.type === 'AVATAR_ITEMS' ? new LimitedItems(this.client, offer)
       : offer.type.endsWith('OUTFITS') ? new LimitedCollection(this.client, offer)
       : new LimitedOffer(this.client, offer);
   });
 }

 /**
  * Fetch ability exchange voucher count.
  * @returns {number}
  */
 async fetchAbilityExchangeVoucherCount() {
   const response = await this.client.rest.get(Routes.ABILITY_EXCHANGE_VOUCHER_COUNT());
   return response.voucherCount;
 }

}

module.exports = ClientPlayer;
