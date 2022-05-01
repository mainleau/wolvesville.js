module.exports = {
  SIGN_IN: () => '/players/signInWithEmailAndPassword',
  TOKEN_REFRESH: () => '/players/createIdToken',

  AVATAR_ITEMS: () => '/avatarItems',

  PARTIAL_PLAYER_BY_USERNAME: () => '/players/search',
  PLAYER: (id) => `/players/${id ? id : 'me'}`,
  INVENTORY: () => '/inventory',
  EQUIPPED_ITEMS: () => '/equippedItems',
  ANNOUNCEMENTS: () => '/announcements',
  FRIEND_REFERRAL_REWARDS: () => '/players/friendInvitationRewards',
  DAILY_REWARDS: () => '/dailyRewards',
  GOLDEN_WHEEL_REWARDS: () => '/rewards/goldenWheelItems',
  CHALLENGES: () => '/challenges/v2',
  BATTLE_PASS_SEASON: () => '/battlePass/seasonAndBattlePass',
  RANKED_SEASON: () => '/ranked/seasonInfoCompact',
  CALENDARS: () => '/calendars',
  SENT_GIFTS: () => '/billing/gifts/sent',
  RECEIVED_GIFTS: () => '/billing/gifts/received',
  CLAN_REQUESTS: () => '/clans/openRequests',
  FRIEND_REQUESTS: () => '/friendRequests/pending',
  CUSTOM_GAME_OWNED_ROLES: () => '/customGames/ownRoles',
  LIMITED_OFFERS: () => '/billing/rotatingLimitedOffers',

  FRIENDS: () => '/friends',

  CLAN: (id) => `/clans/${id ? id : 'myClan'}`,
  CLAN_BY_PLAYER_ID: () => '/clans/byPlayer',
  QUERY_CLAN: () => '/clans/v2/searchAdvanced',
  CLAN_CHAT: () => '/clans/chat/v2',

  XP_LEADERBOARD_FRIENDS: () => '/highScores/top100Friends',
  XP_LEADERBOARD_DAILY: () => '/highScores/top100Daily',
  XP_LEADERBOARD_WEEKLY: () => '/highScores/top100Weekly',
  XP_LEADERBOARD_MONTHLY: () => '/highScores/top100Monthly',
  XP_LEADERBOARD: () => '/highScores/top100',
  RANKED_SEASON_LEADERBOARD: (offset) => `/ranked/highScore${!offset ? '/top100' : ''}`,

  CUSTOM_GAME_LOBBIES: () => '/api/public/game/custom'
}
