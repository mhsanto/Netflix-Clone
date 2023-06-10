import CardSlider from "./CardSlider";

const Slider = ({ movies }) => {
  const listOfMovies = (from, to) => {
    return movies.slice(from, to);
  };
  return (
    <div>
      <CardSlider title="Popular" MovieSlice={listOfMovies(0, 10)} />
      <CardSlider title="Trending" MovieSlice={listOfMovies(10, 20)} />
      <CardSlider title="Romance" MovieSlice={listOfMovies(20, 30)} />
      <CardSlider title="Top Rated" MovieSlice={listOfMovies(30, 40)} />
      <CardSlider title="Upcoming" MovieSlice={listOfMovies(40, 50)} />
      <CardSlider title="Netflix Originals" MovieSlice={listOfMovies(50, 60)} />
    </div>
  );
};

export default React.memo(Slider);
