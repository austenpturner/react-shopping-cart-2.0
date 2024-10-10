import { FaHeart, FaUser } from "react-icons/fa";
import { IoBagSharp } from "react-icons/io5";

export const mainNavItems = [
  {
    id: 1,
    name: "account",
    link: "/account",
    icon: FaUser,
  },
  {
    id: 2,
    name: "favorites",
    link: "/account",
    icon: FaHeart,
  },
  {
    id: 3,
    name: "cart",
    link: "/cart",
    icon: IoBagSharp,
  },
];
