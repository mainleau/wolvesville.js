const BaseClient = require('./BaseClient');
const PlayerManager = require('../managers/PlayerManager');
const ClanManager = require('../managers/ClanManager');
const FriendManager = require('../managers/FriendManager');
const LeaderboardManager = require('../managers/LeaderboardManager');
const GameManager = require('../managers/GameManager');
const ClientPlayer = require('../structures/ClientPlayer');
const { getAuthenticationHeaders, getBodyHeaders } = require('../util/Headers');
const fetch = require('node-fetch');

/**
 * Wolvesville client.
 */
class Client extends BaseClient {
  /**
   * @param {ClientOptions} options Options for the client
   */
  constructor(options) {
    super(options);

    Object.defineProperty(this, 'refreshToken', { writable: true });
    Object.defineProperty(this, 'token', { writable: true });

    /**
     * The player manager of the client.
     * @type {PlayerManager}
     */
    this.players = new PlayerManager(this);

    /**
     * The friend manager of the client.
     * @type {FriendManager}
     */
    this.friends = new FriendManager(this);

    /**
     * The clan manager of the client.
     * @type {ClanManager}
     */
    this.clans = new ClanManager(this);

    /**
     * The leaderboard manager of the client.
     * @type {LeaderboardManager}
     */
    this.leaderboards = new LeaderboardManager(this);

    /**
     * The game manager of the client.
     * @type {GameManager}
     */
    this.games = new GameManager(this);

    /**
     * Ready timestamp.
     * @type {?number}
     */
    this.readyTimestamp = null;
  }

  /**
   * Time at which the client was ready.
   * @type {?Date}
   * @readonly
   */
  get readyAt() {
    return this.readyTimestamp && new Date(this.readyTimestamp);
  }

  /**
   * How long it has been since the client was ready.
   * @type {?number}
   * @readonly
   */
  get uptime() {
    return this.readyTimestamp && Date.now() - this.readyTimestamp;
  }

  /**
   * Is client token expired.
   * @returns {boolean}
   * @readonly
   */
  static get expired() {
    if(!this.refreshToken || typeof this.refreshToken !== 'string') {
      throw new Error('REFRESH_TOKEN_NOT_FOUND');
    }

    return new Date(this.lastTokenRefreshTimestamp).getTime() + 60 * 60 * 1000 < Date.now();
  }

  /**
   * Login.
   * @param {Object} credentials Credentials
   * @param {string} credentials.email Email
   * @param {string} credentials.password Password
   * @returns {Client}
   */
  async login(credentials) {

    if(process.env.WOLVESVILLE_EMAIL && process.env.WOLVESVILLE_PASSWORD) {
      credentials = {
        email: process.env.WOLVESVILLE_EMAIL,
        password: process.env.WOLVESVILLE_PASSWORD
      }
    }

    if(!credentials || typeof credentials !== 'object') throw new Error('INVALID_CREDENTIALS_FORMAT');
    const request = await fetch(`${this.options.http.api.auth}/players/signInWithEmailAndPassword`, {
      method: 'POST',
      headers: getBodyHeaders(),
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });
    const response = await request.json();

    if(response.message) throw new Error('INVALID_CREDENTIALS');
    this.refreshToken = response.refreshToken;
    this.lastTokenRefreshTimestamp = Date.now();
    this.token = response.idToken;
    this.readyTimestamp = Date.now();
    this.upper = setInterval(() => this.tokenRefresh(), this.options.tokenRefreshInterval);
    return this;
  }

  /**
   * Refresh client token.
   */
  async tokenRefresh() {
    if(!this.refreshToken || typeof this.refreshToken !== 'string') throw new Error('REFRESH_TOKEN_NOT_FOUND');

    const request = await fetch(`${this.options.http.api.auth}/players/createIdToken`, {
      method: 'POST',
      headers: getBodyHeaders(),
      body: JSON.stringify({
        refreshToken: this.refreshToken
      })
    });
    const response = await request.json();

    if(response.code) throw new Error('INVALID_REFRESH_TOKEN');
    this.token = response.idToken;
    this.lastTokenRefreshTimestamp = Date.now();
  }

  /**
   * Destroy client.
   */
  destroy() {
    this.upper = clearInterval(this.upper);
    this.refreshToken = null;
    this.token = null;
    this.readyTimestamp = null;
  }

  /**
   * Fetch player associated to the client.
   * @param {Object} [options={}] Options
   * @returns {ClientPlayer}
   */
  async fetchPlayer(options = {}) {

    if(!options.force) {
      const existing = this.players.cache.find(player => player.own);
      if(existing) return existing;
    }

    const request = await fetch(`${this.options.http.api.core}/players/me`, {
      method: 'GET',
      headers: getAuthenticationHeaders(this.token)
    });
    const response = await request.json();

    const data = new ClientPlayer(this, response);
    return this.players._add(data);
  }

}

module.exports = Client;
