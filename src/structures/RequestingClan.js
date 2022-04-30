const BaseClan = require('./BaseClan');

/**
 * Represents a requesting clan.
 * @extends {BaseClan}
 */
class RequestingClan extends BaseClan {
  constructor(client, data) {
    super(client, data);
  }
}

module.exports = RequestingClan;
