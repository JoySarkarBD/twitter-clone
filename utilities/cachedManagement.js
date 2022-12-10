const Redis = require("redis");
const redisClient = Redis.createClient(`http://127.0.0.1:6379`);

const cacheExpirationTime = 604800; // one week

// get and set cache data
const getAndSetCachedData = async (key, callback) => {
  try {
    const data = await redisClient.get(key);
    if (data) {
      return JSON.parse(data);
    } else {
      const newData = await callback();
      redisClient.setEx(key, cacheExpirationTime, JSON.stringify(newData));
    }
  } catch (error) {
    throw error;
  }
};

const updateCacheData = async (key, value) => {
  try {
    redisClient.setEx(key, cacheExpirationTime, JSON.stringify(value));
  } catch (error) {
    throw error;
  }
};

const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  redisClient,
  updateCacheData,
  getAndSetCachedData,
  deleteCache,
};
