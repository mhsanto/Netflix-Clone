import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";

const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => setIsScrolled(window.pageXOffset === null);
  };
  return (
    <div>
      <Navbar isScrolled={isScrolled} />
    </div>
  );
};

export default Netflix;
