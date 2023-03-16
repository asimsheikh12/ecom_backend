require('dotenv').config();

const envConfig = {
  baseURL: process.env.BASE_URL,
  port: process.env.PORT,
  db: {
    mongoUri: process.env.MONGO_URL,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  jwt: {
    expiresIn: process.env.EXPIRES_IN,
    jwtSecret: process.env.JWT_SECRET,
  },
  stripe: {
    apiKey: process.env.STRIPE_API_KEY,
  },
};
module.exports = { envConfig };
