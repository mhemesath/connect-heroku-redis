/**
 * connect-heroku-redis
 * Copyright(c) 2010 Michael Hemesath <mike.hemesath@gmail.com>
 * MIT Licensed
 */

var parse = require("url").parse;

var redisToGo = process.env.REDISTOGO_URL ? parse(process.env.REDISTOGO_URL) : false; 


/**
 * Return connect heroku redis store
 * @param {int} version
 * @return RedisStore
 * @api public
 */
module.exports = function(connect) {
  
  var RedisStore = require('connect-redis')(connect);
  
  function ConnectHerokuRedis(options) {
    options = options || {};

    if (redisToGo) {
      options.host = options.host || redisToGo.hostname;
      options.port = options.port || redisToGo.port;
      
      if (!options.pass && redisToGo.auth) {
        options.pass = options.pass || redisToGo.auth.split(":")[1];
      }
    }
    
    RedisStore.call(this, options);
  }
  
  // Inherit from Connect Redis
  ConnectHerokuRedis.prototype = new RedisStore;
  
  return ConnectHerokuRedis;
}