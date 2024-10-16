import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import DetailsPage from "./pages/details";
import CartPage from "./pages/cart";
import LoginPage from "./pages/login";
import AccountPage from "./pages/account";
import ErrorPage from "./pages/error/error";
import ProductPage from "./pages/products";
import PlaceholderPage from "./pages/placeholder";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/terms" element={<PlaceholderPage />} />
      <Route path="/about" element={<PlaceholderPage />} />
      <Route path="/contact" element={<PlaceholderPage />} />
      <Route path="/help" element={<PlaceholderPage />} />
      <Route path="/product-details/:id" element={<DetailsPage />} />
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
