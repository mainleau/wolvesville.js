const Base = require('./Base');

/**
 * Represents a talisman.
 * @extends {Base}
 */
class Talisman extends Base {
  constructor(client, data) {
    super(client);

    this.id = data.id;

    this.name = data.type;

    Object.defineProperty(this, 'cost', { value: data.costInSilver });
  }
}

module.exports = Talisman;
