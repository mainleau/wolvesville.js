'use strict';

const fetch = require('node-fetch');

class APIRequest {
  constructor(rest, method, path, options) {
    this.rest = rest;
    this.method = method;
    this.route = options.route;
    this.options = options;

    let queryString = '';
    if (options.query) {
      const query =
        typeof options.query === 'string'
          ? options.query
          : Object.entries(options.query)
              .filter(([, value]) => value !== null && typeof value !== 'undefined')
              .flatMap(([key, value]) => (Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]));
      queryString = new URLSearchParams(query).toString();
    }
    this.path = `${path}${queryString && `?${queryString}`}`;
  }

  make() {
    const url = (this.options.api || this.rest.options.api.core) + this.path;

    let headers = {};

    if (this.options.api !== this.rest.options.api.auth) headers.Authorization = `Bearer ${this.rest.token}`;

    let body;

    if ((this.options.api || this.rest.options.api.core) === this.rest.options.api.core) {
      headers.ids = 1;
    }

    if (this.options.data !== null && this.options.data !== undefined) {
      body = JSON.stringify(this.options.data);
      headers['Content-Type'] = 'application/json';
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.rest.options.timeout);
    return fetch(url, {
      method: this.method,
      headers,
      body,
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));
  }
}

module.exports = APIRequest;
