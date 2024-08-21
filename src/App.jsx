import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout";
import ProductListPage from "./pages/product-list";
import ProductDetailsPage from "./pages/product-details";
import ShoppingCartPage from "./pages/cart";
import LoginPage from "./pages/login";
import AccountPage from "./pages/account";
import ErrorPage from "./pages/error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<ProductListPage />} />
      <Route path="/cart" element={<ShoppingCartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/product-details/:id" element={<ProductDetailsPage />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
