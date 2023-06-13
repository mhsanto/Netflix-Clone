//internal external exports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const UserRouter = require("./routes/UserRoutes");
const app = express();

/* `app.use(cors())` is enabling Cross-Origin Resource Sharing (CORS) for the Express app, which allows
the app to make requests to and receive responses from other domains. */
app.use(cors());
app.use(express.json());

/* This code is connecting to a MongoDB database using Mongoose,. */
mongoose
  .connect(process.env.MONGOOSE_SERVER, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Mongoose connection successful`))
  .catch((error) => console.log(error));
//routes
app.use("/api/user", UserRouter);

//server listener
const port = process.env.SERVER_PORT || 3002;
app.listen(port, () => console.log(`listening to port ${port}`));
