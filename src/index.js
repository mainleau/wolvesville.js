'use strict';

exports.Client = require('./client/Client');

exports.BaseManager = require('./managers/BaseManager');
exports.CacheManager = require('./managers/CacheManager');
exports.ClanManager = require('./managers/ClanManager');
exports.FriendManager = require('./managers/FriendManager');
exports.GameManager = require('./managers/GameManager');
exports.ItemManager = require('./managers/ItemManager');
exports.LeaderboardManager = require('./managers/LeaderboardManager');
exports.PlayerManager = require('./managers/PlayerManager');

exports.Achievement = require('./structures/Achievement');
exports.ActiveClanQuest = require('./structures/ActiveClanQuest');
exports.Announcement = require('./structures/Announcement');
exports.AnnouncementAttachment = require('./structures/AnnouncementAttachment');
exports.AnnouncementAuthor = require('./structures/AnnouncementAuthor');
exports.AvailableClanQuests = require('./structures/AvailableClanQuests');
exports.Avatar = require('./structures/Avatar');
exports.AvatarItem = require('./structures/AvatarItem');
exports.AvatarSlot = require('./structures/AvatarSlot');
exports.Background = require('./structures/Background');
exports.Ban = require('./structures/Ban');
exports.Base = require('./structures/Base');
exports.BaseClan = require('./structures/BaseClan');
exports.BasePlayer = require('./structures/BasePlayer');
exports.BattlePassSeason = require('./structures/BattlePassSeason');
exports.BattlePassReward = require('./structures/BattlePassReward');
exports.Calendar = require('./structures/Calendar');
exports.CalendarReward = require('./structures/CalendarReward');
exports.Challenge = require('./structures/Challenge');
exports.ChallengeReward = require('./structures/ChallengeReward');
exports.Clan = require('./structures/Clan');
exports.ClanChatMessage = require('./structures/ClanChatMessage');
exports.ClanChatMessageAuthor = require('./structures/ClanChatMessageAuthor');
exports.ClanLedgerField = require('./structures/ClanLedgerField');
exports.ClanLedgerFieldPlayer = require('./structures/ClanLedgerFieldPlayer');
exports.ClanLog = require('./structures/ClanLog');
exports.ClanLogPlayer = require('./structures/ClanLogPlayer');
exports.ClanMember = require('./structures/ClanMember');
exports.ClanQuest = require('./structures/ClanQuest');
exports.ClanQuestParticipant = require('./structures/ClanQuestParticipant');
exports.ClanQuestReward = require('./structures/ClanQuestReward');
exports.ClanRequest = require('./structures/ClanRequest');
exports.ClientClan = require('./structures/ClientClan');
exports.ClientClanMember = require('./structures/ClientClanMember');
exports.ClientPlayer = require('./structures/ClientPlayer');
exports.CustomGame = require('./structures/CustomGame');
exports.CustomGameHost = require('./structures/CustomGameHost');
exports.DailyReward = require('./structures/DailyReward');
exports.DailyRewards = require('./structures/DailyRewards');
exports.DailyXPLeaderboard = require('./structures/DailyXPLeaderboard');
exports.Emoji = require('./structures/Emoji');
exports.EquippedItems = require('./structures/EquippedItems');
exports.Friend = require('./structures/Friend');
exports.FriendReferralReward = require('./structures/FriendReferralReward');
exports.FriendRequest = require('./structures/FriendRequest');
exports.FriendRequestPlayer = require('./structures/FriendRequestPlayer');
exports.FriendRequestRecipient = require('./structures/FriendRequestRecipient');
exports.FriendRequestSender = require('./structures/FriendRequestSender');
exports.FriendsXPLeaderboard = require('./structures/FriendsXPLeaderboard');
exports.Gift = require('./structures/Gift');
exports.GiftRecipient = require('./structures/GiftRecipient');
exports.GiftSender = require('./structures/GiftSender');
exports.GoldenWheelReward = require('./structures/GoldenWheelReward');
exports.Inventory = require('./structures/Inventory');
exports.LeaderboardPlayer = require('./structures/LeaderboardPlayer');
exports.LifetimeXPLeaderboard = require('./structures/LifetimeXPLeaderboard');
exports.LimitedCollection = require('./structures/LimitedCollection');
exports.LimitedItemsOffer = require('./structures/LimitedItemsOffer');
exports.LimitedOffer = require('./structures/LimitedOffer');
exports.LoadingScreen = require('./structures/LoadingScreen');
exports.Lootbox = require('./structures/Lootbox');
exports.MonthlyXPLeaderboard = require('./structures/MonthlyXPLeaderboard');
exports.Offer = require('./structures/Offer');
exports.Outfit = require('./structures/Outfit');
exports.OwnedClanIcon = require('./structures/OwnedClanIcon');
exports.OwnedProfileIcon = require('./structures/OwnedProfileIcon');
exports.Player = require('./structures/Player');
exports.ProfileIcon = require('./structures/ProfileIcon');
exports.QueriedClan = require('./structures/QueriedClan');
exports.RankedAward = require('./structures/RankedAward');
exports.RankedLeaderboard = require('./structures/RankedLeaderboard');
exports.RankedLeaderboardPlayer = require('./structures/RankedLeaderboardPlayer');
exports.RankedSeason = require('./structures/RankedSeason');
exports.ReceivedFriendRequest = require('./structures/ReceivedFriendRequest');
exports.ReceivedGift = require('./structures/ReceivedGift');
exports.RequestingClan = require('./structures/RequestingClan');
exports.Role = require('./structures/Role');
exports.RoleCard = require('./structures/RoleCard');
exports.RoleCardPerk = require('./structures/RoleCardPerk');
exports.RosePackage = require('./structures/RosePackage');
exports.SentFriendRequest = require('./structures/SentFriendRequest');
exports.SentGift = require('./structures/SentGift');
exports.Talisman = require('./structures/Talisman');
exports.WeeklyXPLeaderboard = require('./structures/WeeklyXPLeaderboard');
exports.XPLeaderboard = require('./structures/XPLeaderboard');
exports.XPLeaderboardPlayer = require('./structures/XPLeaderboardPlayer');

exports.Util = require('./util/Util');
exports.Constants = require('./util/Constants');
