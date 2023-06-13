import { useEffect, useState } from "react";

const useNavbarColorChange = () => {
  const [isScrolled, setIsScrolled] = useState(true);
  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.scrollY === 0 ? false : true);
      return () => setIsScrolled(window.scrollY === null);
    };
  }, []);
  return isScrolled;
};

export default useNavbarColorChange;
