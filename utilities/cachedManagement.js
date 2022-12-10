const redis = require("redis").createClient();
const cacheExpirationTime = 604800; // one week

// get and set cache data
const getAndSetCachedData = async (key, callback) => {
  try {
    const data = await redis.get(key);
    if (data) {
      return JSON.parse(data);
    } else {
      const newData = await callback();
      redis.setEx(key, cacheExpirationTime, JSON.stringify(newData));
    }
  } catch (error) {
    throw error;
  }
};

const updateCacheData = async (key, value) => {
  try {
    redis.setEx(key, cacheExpirationTime, JSON.stringify(value));
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
  redis,
  updateCacheData,
  getAndSetCachedData,
  deleteCache,
};
