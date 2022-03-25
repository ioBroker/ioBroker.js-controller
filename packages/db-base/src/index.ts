export = {
    inMemoryFileDB: require('./lib/inMemFileDB.js'),
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    redisHandler: require('./lib/redisHandler.js').RedisHandler,
    tools: require('./lib/tools.js')
};
