'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/giftRegistry-dev';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://localhost:27017/giftRegistry-test'
exports.PORT = process.env.PORT || 3000;
exports.JWT_SECRET = process.env.JWT_SECRET || 'hiitme';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '14d';
