const APIRequest = require('./APIRequest');
const routeBuilder = require('./APIRouter');

class RESTManager {
  constructor(client) {
    this.client = client;
  }

  get api() {
    return routeBuilder(this);
  }

  async request(method, url, options = {}) {
    const request = new APIRequest(this, method, url, options);

    const response = await request.make();
    if(!response.ok) throw new Error('REQUEST_FAILED');

    if(response.headers.get('Content-Type')?.startsWith('application/json')) {
      return await response.json();
    } else {
      throw new Error('INVALID_RESPONSE')
    }
  }
}

module.exports = RESTManager;
