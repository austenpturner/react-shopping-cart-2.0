import AccountOverview from "../components/accountOverview/accountOverview";
import FavoritesList from "../components/favoritesList/favoritesList";
import Orders from "../components/orders/orders";
import PasswordChange from "../components/passwordChange/passwordChange";
import Reviews from "../components/reviews/reviews";

export const views = [
  {
    name: "overview",
    component: AccountOverview,
  },
  {
    name: "password",
    component: PasswordChange,
  },
  {
    name: "orders",
    component: Orders,
  },
  {
    name: "review",
    component: Reviews,
  },
  {
    name: "favorites",
    component: FavoritesList,
  },
];
