/**
 * connect-heroku-redis
 * Copyright(c) 2010 Michael Hemesath <mike.hemesath@gmail.com>
 * MIT Licensed
 */

var parse = require("url").parse;

/**
 * Return connect heroku redis store
 * @param {int} version
 * @return RedisStore
 * @api public
 */
module.exports = function(connect) {
  
  var redisToGoURL = process.env.REDISTOGO_URL ? parse(process.env.REDISTOGO_URL) : false; 
  
  return function(options) {

    if (redisToGoURL) {
      options.host = options.host || redisToGo.hostname;
      options.port = options.port || redisToGo.port;
      options.pass = options.pass || redisToGo.auth.spli(":")[1];
    }

    return new RedisStore(options);
  }
}