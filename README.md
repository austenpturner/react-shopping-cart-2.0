# React Shopping Cart App

Built with:

- React + Vite
- Redux
- React Router
- React lazyload
- React icons
- DummyJSON

Custom hooks:

- useFetch (src/hooks/useFetch.jsx) custom hook reused in components to fetch data from DummyJSON

Redux store:

- cart-slice to store cart items, cart total, and reducers (src/store/slices/cart-slice.js)

Routing:

- Dynamic routing used for product detail pages
- <RouteProvider> used with createBrowserRouter to create routes & nested routes from elements and pages
- Layout used with <Outlet> to render main header and page elements for each page & route
