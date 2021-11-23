const Base = require('./Base');

class Gift extends Base {
  constructor(client, data) {
    super(client);
    this.type = data.description;
    this.purchaseTimestamp = new Date(data.purchaseTime);
  }
}

module.exports = Gift;
