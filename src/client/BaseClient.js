'use strict';

const REST = require('../rest/REST');
const Options = require('../util/Options');
const Util = require('../util/Util');

/**
 * The base class for all clients.
 */
class BaseClient {
  constructor(options = {}) {
    if (typeof options !== 'object' || options === null) {
      throw new Error('INVALID_OPTIONS');
    }

    /**
     * The options the client was instantiated with
     * @type {ClientOptions}
     */
    this.options = Util.mergeDefault(Options.createDefault(), options);

    /**
     * The REST manager of the client
     * @type {REST}
     */
    this.rest = new REST(this.options.rest);
  }
}

module.exports = BaseClient;
