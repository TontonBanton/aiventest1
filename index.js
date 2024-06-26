const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Test
app.get('/', (req, res) => {
  res.send('API is running');
});

//Routes
const routes = require('./routes');
app.use('/api', routes);

//Database
const { sequelize } = require('./models');
const PORT = process.env.PORT || 3001;
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to sync database:', err);
});

module.exports = app;
