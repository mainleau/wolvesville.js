'use strict';

class Base {
  constructor(client) {
    Object.defineProperty(this, 'client', { value: client });
  }
}

module.exports = Base;
