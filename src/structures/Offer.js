const Base = require('./Base');

/**
 * Represents an offer.
 * @extends {Base}
 */
class Offer extends Base {
  constructor(client, data) {
    super(client);

    this.name = data.type;
    this.cost = data.costInGems;
  }
}

module.exports = Offer;
