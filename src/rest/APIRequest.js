const https = require('node:https');
const { setTimeout } = require('node:timers');
const fetch = require('node-fetch');

class APIRequest {
  constructor(rest, method, path, options) {
    this.rest = rest;
    this.client = rest.client;
    this.method = method;
    this.route = options.route;
    this.options = options;

    let queryString = '';
    if(options.query) {
      const query = Object.entries(options.query)
        .filter(([, value]) => value !== null && typeof value !== 'undefined')
        .flatMap(([key, value]) => (Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]));
      queryString = new URLSearchParams(query).toString();
    }
    this.path = `${path}${options.version ? '/v2' : ''}${queryString && `?${queryString}`}`;
  }

  make() {
    const url = (this.options.api || this.client.options.http.api.core) + this.path;

    let headers = {};

    if(this.options.api !== this.client.options.http.api.auth) headers.Authorization = `Bearer ${this.client.token}`;

    let body;

    if(this.options.data != null) {
      body = JSON.stringify(this.options.data);
      headers['Content-Type'] = 'application/json';
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.client.options.restRequestTimeout).unref();
    return fetch(url, {
      method: this.method,
      headers,
      body,
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));
  }
}

module.exports = APIRequest;
