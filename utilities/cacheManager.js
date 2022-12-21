/* dependencies */

const Redis = require("redis");
const redisClient = Redis.createClient(`http://127.0.0.1:6379`);
const expireTime = 604800;

/* get data from redis db, if data was not found from redis db then data will find from primary db & set redis db NB: secondary db */

async function cacheGetAndSet(key, cb) {
  try {
    const data = await redisClient.get(key);
    if (data) {
      return JSON.parse(data);
    } else {
      newData = await cb();
      redisClient.setEx(key, expireTime, JSON.stringify(newData));
      return newData;
    }
  } catch (error) {
    console.log(error);
  }
}

/* set or update data on redis db || cache memory  */

async function updateOrSetdata(key, value) {
  try {
    await redisClient.setEx(key, expireTime, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}
async function deleteCache(key) {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.log(error);
  }
}

/* export module */

module.exports = {
  redisClient,
  cacheGetAndSet,
  updateOrSetdata,
  deleteCache,
};
