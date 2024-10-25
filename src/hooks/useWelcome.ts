import { useUser } from "@/context/UserContext";
import { useEffect, useRef, useState } from "react";

export const useWelcome = () => {
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        btnRef.current &&
        !menuRef.current.contains(event.target) &&
        !btnRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return { user, btnRef, menuRef, isOpen, logout, toggleOpen };
};
