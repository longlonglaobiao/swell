const redis = require("redis");
const redisClient = redis.createClient(6379, "127.0.0.1");

redisClient.on("error", (err) => {
  console.error(err);
});

// const set = (key, val) => {
//   if (typeof val == "object") val = JSON.stringify(val);
//   redisClient.set(key, val);
// };

// const get = (key) => {
//   return new Promise((resolve, reject) => {
//     redisClient.get(key, (err, result) => {
//       if (err) {
//         console.error(err);
//         reject(err);
//         return;
//       } else {
//         resolve(JSON.parse(result));
//       }
//     });
//   });
// };

module.exports = redisClient;
