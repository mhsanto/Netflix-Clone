import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Netflix from "./pages/Netflix";
import { GlobalStyle } from "./Styled/GlobalStyle";
import VideoPlayer from "./pages/VideoPlayer";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Netflix />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/player" element={<VideoPlayer />} />
      </Routes>
    </>
  );
};

export default App;
