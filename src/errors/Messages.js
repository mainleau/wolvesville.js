'use strict';
const { register } = require('./APIError');

const Messages = {
  INVALID_TIMESTAMP: 'Invalid timestamp.',
};

for (const [name, message] of Object.entries(Messages)) register(name, message);
