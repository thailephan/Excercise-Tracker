const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const rootRouter = require('./routes/index');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;
const user = process.env.ATLAS_USER_NAME;
const pass = process.env.ATLAS_USER_PASS;
const version = process.env.API_VERSION;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    user,
    pass,
  })
  .then(() => console.log('Connect to db'))
  .catch((err) => console.log('Connect db Error: ', err));

app.use(cors());
app.use(express.json());

app.use(`/api/v${version}`, rootRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
