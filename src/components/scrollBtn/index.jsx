import { useEffect, useState } from "react";
import Button from "../button";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopBtn() {
  const [showBtn, setShowBtn] = useState(false);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 80) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    showBtn && (
      <Button
        handleAction={scrollToTop}
        type="scrollToTop"
        aria-label="scroll to top"
        icon={<FaArrowUp />}
      />
    )
  );
}
