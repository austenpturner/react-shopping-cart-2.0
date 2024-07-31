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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<ProductListPage />} />
      <Route path="/shopping-cart" element={<ShoppingCartPage />} />
      <Route path="/product-details/:id" element={<ProductDetailsPage />} />
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
