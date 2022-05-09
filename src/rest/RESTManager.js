'use strict';

const APIRequest = require('./APIRequest');

class RESTManager {
  constructor(client) {
    this.client = client;
  }

  get(route, options = {}) {
    return this.#request('GET', route, options);
  }

  post(route, options = {}) {
    return this.#request('POST', route, options);
  }

  async #request(method, route, options) {
    const request = new APIRequest(this, method, route, options);

    const response = await request.make();
    if (response.status !== 200) return { code: response.status };

    if (response.headers.get('Content-Type')?.startsWith('application/json')) {
      return response.json();
    } else {
      throw new Error('INVALID_RESPONSE');
    }
  }
}

module.exports = RESTManager;
