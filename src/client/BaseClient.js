'use strict';

const RESTManager = require('../rest/RESTManager');
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
     * @type {RESTManager}
     */
    this.rest = new RESTManager(this);
  }
}

module.exports = BaseClient;
