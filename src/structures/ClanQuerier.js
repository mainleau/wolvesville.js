const Base = require('./Base');
const QueriedClan = require('./QueriedClan');
const { Collection } = require('@discordjs/collection');

/**
 * Represents a clan querier.
 * @extends {Base}
 */
class ClanQuerier extends Base {
  constructor(client, data) {
    super(client);

    /**
     * Clans.
     * @type {Collection<string, Clan>}
     */
    this.clans = new Collection();

    for (const clan of data) {
      this.clans.set(
        clan.id,
        new QueriedClan(client, { clan })
      );
    }
  }

  /**
   * Clan xp needed to be in top 10.
   * @type {number}
   * @readonly
   */
   get top10Requirement() {
     return this.clans.at(9).xp;
   }

   /**
    * Clan xp needed to be in top 100.
    * @type {number}
    * @readonly
    */
   get top100Requirement() {
     return this.clans.at(99).xp;
   }

}

module.exports = ClanQuerier;
