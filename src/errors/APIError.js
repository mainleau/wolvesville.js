'use strict';

// Heavily inspired by node's `internal/errors` module

const kCode = Symbol('code');
const messages = new Map();

function makeAPIError(Base) {
  return class APIError extends Base {
    constructor(key, ...args) {
      super(message(key, args));
      this[kCode] = key;
      if (Error.captureStackTrace) Error.captureStackTrace(this, APIError);
    }

    get name() {
      return `${super.name} [${this[kCode]}]`;
    }

    get code() {
      return this[kCode];
    }
  };
}

function message(key, args) {
  if (typeof key !== 'string') throw new Error('Error message key must be a string');
  const msg = messages.get(key);
  if (!msg) throw new Error(`An invalid error message key was used: ${key}.`);
  if (typeof msg === 'function') return msg(...args);
  if (!args?.length) return msg;
  args.unshift(msg);
  return String(...args);
}

function register(sym, val) {
  messages.set(sym, typeof val === 'function' ? val : String(val));
}

module.exports = {
  register,
  Error: makeAPIError(Error),
  TypeError: makeAPIError(TypeError),
  RangeError: makeAPIError(RangeError),
};
