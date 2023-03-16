const { connect } = require('mongoose');

const {
  envConfig: {
    db: { mongoUri, useNewUrlParser, useUnifiedTopology },
  },
} = require('./env.config');

connect(mongoUri, {
  useNewUrlParser,
  useUnifiedTopology,
})
  .then(() => console.log('Database connected successfully!'))
  .catch((error) => console.log(error));
