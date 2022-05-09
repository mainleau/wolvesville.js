'use strict';

class Headers {
  static getBodyHeaders() {
    return {
      'Content-Type': 'application/json',
    };
  }

  static getAuthenticationHeaders(token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  static getAuthenticationHeadersContainsBody(token) {
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
}

module.exports = Headers;
