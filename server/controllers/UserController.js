const UserModel = require("../models/UserModel");

const AddToLikedMovies = async (req, res) => {
  try {
    let { email, data } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
      let { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (movieAlreadyLiked) {
        res.statusCode(400).res.json({
          message: "You already liked the movie",
        });
      } else {
        await UserModel.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          {
            new: true,
          }
        );
      }
    } else {
      await UserModel.create({ email, likedMovies: [data] });
    }
    return res.json({ message: "Movie added Successfully" });
  } catch (error) {
    res.json({ message: "Movie cannot added to the list" });
  }
};

const getLikedMovies = async (req, res) => {
  try {
    const { email } = await req.params;
    const user = await UserModel.findOne({ email });
    if (email) {
      res.json({ message: "SuccessFull", movies: user.likedMovies });
    } else {
      return res.json({ message: "Email not found" });
    }
  } catch (error) {
    return res.json({ message: "Can't find Liked movies" });
  }
};
module.exports = { AddToLikedMovies, getLikedMovies };
