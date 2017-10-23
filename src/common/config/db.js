'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mongo',
  adapter: {
    mongo: {
      host: '127.0.0.1',
      port: '27017',
      database: 'tmp_mongo',
      user: '',
      password: '',
      prefix: '',
      encoding: 'utf8'
    }
  }
};
