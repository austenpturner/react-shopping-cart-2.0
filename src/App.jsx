import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Layout from "./layout";
import ProductListPage from "./pages/product-list";
import ProductDetailsPage from "./pages/product-details";
import ShoppingCartPage from "./pages/cart";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import AuthPage from "./pages/private-route";
import AccountPage from "./pages/account";
import { useSelector } from "react-redux";

const userRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<ProductListPage />} />
      <Route path="/login" element={<ProductListPage />} />
      <Route
        path="/account"
        element={
          <AuthPage>
            <AccountPage />
          </AuthPage>
        }
      />
      <Route path="/shopping-cart" element={<ShoppingCartPage />} />
      <Route path="/product-details/:id" element={<ProductDetailsPage />} />
    </Route>
  )
);

function App() {
  const user = useSelector((state) => state.users);
  console.log(user);
  return (
    <div>
      {user.currentUser ? (
        <RouterProvider router={userRouter} />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route index element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
