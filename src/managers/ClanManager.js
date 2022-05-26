'use strict';

const { Collection } = require('@discordjs/collection');
const CacheManager = require('./CacheManager');
const Clan = require('../structures/Clan');
const ClientClan = require('../structures/ClientClan');
const QueriedClan = require('../structures/QueriedClan');
const Routes = require('../util/Routes');
const { isUUID } = require('../util/Util');

/**
 * Manages API methods for Clans.
 * @extends {BaseManager}
 */
class ClanManager extends CacheManager {
  /**
   * Fetch clan by player id.
   * @param {string} id Player id
   * @param {Object} [options={}] Options
   * @returns {Promise<Clan>}
   */
  async fetchByPlayerId(id, options = {}) {
    if (!options.force) {
      const existing = this.cache.get(id);
      if (existing) return existing;
    }

    if (!id || typeof id !== 'string' || !isUUID(id)) throw new Error('INVALID_PLAYER_ID_FORMAT');
    const response = await this.client.rest.get(Routes.CLAN_BY_PLAYER_ID(), { query: { playerId: id } });
    if (response.code === 204) throw new Error('PLAYER_OR_CLAN_NOT_FOUND');

    const data = new Clan(this.client, response);
    return this._add(data);
  }

  /**
   * Fetch clan by id.
   * @param {string} id Clan id
   * @param {Object} [options={}] Options
   * @returns {Promise<Clan>}
   */
  async fetchById(id, options = {}) {
    if (!options.force) {
      const existing = this.cache.get(id);
      if (existing) return existing;
    }

    if (!id || typeof id !== 'string' || !isUUID(id)) throw new Error('INVALID_CLAN_ID_FORMAT');
    const response = await this.client.rest.get(Routes.CLAN(id));
    if (!response.clan) throw new Error('CLAN_NOT_FOUND');

    const data = new Clan(this.client, response);
    return this._add(data);
  }

  /**
   * Fetch client player clan.
   * @param {Object} [options={}] Options
   * @returns {Promise<ClientClan>}
   */
  async fetchOwn(options = {}) {
    if (!options.force) {
      const existing = this.cache.find(clan => clan.own);
      if (existing) return existing;
    }

    const response = await this.client.rest.get(Routes.CLAN());
    if (response.code === 204) throw new Error('NOT_IN_A_CLAN');

    const data = new ClientClan(this.client, response);
    return this._add(data);
  }

  /**
   * Options for {@link ClanManager#query}.
   * @typedef {Object} ClanQueryingOptions
   * @property {string} searchType What to query
   * @property {number} levelMin Minimum required level of clans
   * @property {number} levelMax Maximum required level of clans
   * @property {string} language Clans language
   * @property {string} joinType Clans join type
   * @property {boolean} notFull Whether to query only non-full clans
   */

  /**
   * Query clans.
   * @param {string} name Clan name to query
   * @param {ClanQueryingOptions} [options] Query options
   * @param {string} [sorting] Query order
   * @returns {Promise<Collection<string, QueriedClan>>}
   */
  async query(name, options = {}, sorting) {
    var params = '';

    if (name && typeof name !== 'string') throw new Error('OPTION_VALUE_MUST_BE_A_STRING');
    params += `?name=${name || ''}`;

    if (options.searchType) {
      if (typeof options.searchType !== 'string') throw new Error('OPTION_VALUE_MUST_BE_A_STRING');
      if (!['exactName', 'tag'].includes(options.searchType)) throw new Error('INVALID_OPTION_VALUE');
      params += `&searchType=${options.searchType}`;
    }

    if (options.levelMin) {
      if (typeof options.levelMin !== 'number') throw new Error('OPTION_VALUE_MUST_BE_A_NUMBER');
      if (options.levelMin < 1 || options.levelMin > 100) throw new Error('OPTION_VALUE_OUT_OF_RANGE');
      if (options.levelMax && options.levelMin > options.levelMax) throw new Error('INVALID_OPTION_VALUES');
      params += `&minLevelMin=${options.levelMin}`;
    }

    if (options.levelMax) {
      if (typeof options.levelMax !== 'number') throw new Error('OPTION_VALUE_MUST_BE_A_NUMBER');
      if (options.levelMax < 1 || options.levelMax > 100) throw new Error('OPTION_VALUE_OUT_OF_RANGE');
      if (options.levelMin && options.levelMin > options.levelMax) throw new Error('INVALID_OPTION_VALUES');
      params += `&minLevelMax=${options.levelMax}`;
    }

    if (options.language) {
      if (
        ![
          'aq',
          'ar',
          'at',
          'au',
          'ax',
          'az',
          'be',
          'bg',
          'bh',
          'bm',
          'bn',
          'br',
          'bs',
          'bw',
          'by',
          'ca',
          'cd',
          'cf',
          'ch',
          'ck',
          'cl',
          'cn',
          'co',
          'cr',
          'cy',
          'cz',
          'de',
          'dk',
          'do',
          'dz',
          'ee',
          'es',
          'eu',
          'fi',
          'fj',
          'fr',
          'gb',
          'gn',
          'gr',
          'gt',
          'hk',
          'hr',
          'hu',
          'id',
          'ie',
          'il',
          'im',
          'in',
          'is',
          'it',
          'jm',
          'jp',
          'kh',
          'kp',
          'kr',
          'kw',
          'kz',
          'la',
          'lr',
          'lt',
          'lu',
          'ma',
          'md',
          'mn',
          'mx',
          'my',
          'nc',
          'nl',
          'no',
          'np',
          'nz',
          'pa',
          'pe',
          'ph',
          'pk',
          'pl',
          'ps',
          'pt',
          'py',
          'ro',
          'rs',
          'ru',
          'se',
          'sg',
          'si',
          'sk',
          'so',
          'sr',
          'sy',
          'th',
          'tr',
          'tw',
          'ua',
          'ug',
          'us',
          'uy',
          'va',
          'vi',
          'vn',
          'ye',
          'za',
          'olympics',
          'united-nations',
          'wales',
          'en',
          'ms',
          'cs',
        ].includes(options.language)
      ) {
        throw new Error('INVALID_OPTION_VALUE');
      }
      params += `&language=${options.language.toUpperCase()}`;
    }

    if (options.joinType) {
      if (!['PUBLIC', 'JOIN_BY_REQUEST', 'PRIVATE'].includes(options.joinType)) throw new Error('INVALID_OPTION_VALUE');
      params += `&joinType=${options.joinType}`;
    }

    if (options.notFull) {
      if (typeof options.notFull !== 'boolean') throw new Error('OPTION_VALUE_MUST_BE_A_BOOLEAN');
      params += `&notFull=${options.notFull}`;
    }

    if (sorting) {
      if (!['XP', 'CREATION_TIME', 'QUEST_HISTORY_COUNT', 'NAME', 'MIN_LEVEL'].includes(sorting)) {
        throw new Error('INVALID_OPTION_VALUE');
      }
      params += `&sortBy=${sorting}`;
    }

    const response = await this.client.rest.get(Routes.QUERY_CLAN(), { query: params });

    const data = response.map(clan => new QueriedClan(this.client, { clan }));
    return data.reduce((col, clan) => col.set(clan.id, this._add(clan)), new Collection());
  }
}

module.exports = ClanManager;
