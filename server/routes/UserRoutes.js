const express = require("express");
const {
  AddToLikedMovies,
  getLikedMovies,
} = require("../controllers/UserController");

const router = express.Router();

router.post("/add", AddToLikedMovies);
router.get("/liked/:email", getLikedMovies);
module.exports = router;
