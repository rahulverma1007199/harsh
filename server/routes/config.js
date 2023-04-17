
var config = {};

config = {
  app: {
    port: 5000
  },
  db: {
    dbname: "whatsapptest",
    username: "root",
    password: "root",
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      mib: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};
console.log(config);
module.exports = config;
