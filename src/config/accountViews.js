import AccountOverview from "../components/accountOverview";
import FavoritesList from "../components/favoritesList";
import Orders from "../components/orders";
// import PasswordChange from "../components/passwordChange";
import Reviews from "../components/reviews";

export const views = [
  {
    name: "overview",
    component: AccountOverview,
  },
  {
    name: "favorites",
    component: FavoritesList,
  },
  // {
  //   name: "password",
  //   component: PasswordChange,
  // },
  {
    name: "orders",
    component: Orders,
  },
  {
    name: "reviews",
    component: Reviews,
  },
];
