module.exports = {
  SIGN_IN: () => '/players/signInWithEmailAndPassword',
  TOKEN_REFRESH: () => '/players/createIdToken',

  AVATAR_ITEMS: () => '/avatarItems',

  PLAYER: (id) => `/players/${id}`,
  PARTIAL_PLAYER_BY_USERNAME: (id) => '/players/search',

  PLAYER: (id) => `/players/${id ? id : 'me'}`,
  INVENTORY: () => '/inventory',

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
