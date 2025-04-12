'use strict';

const contracts = require('..');
const assert = require('assert').strict;

assert.strictEqual(contracts(), 'Hello from contracts');
console.info('contracts tests passed');
