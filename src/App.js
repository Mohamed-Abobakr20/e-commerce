import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import WishList from "./components/WishList/WishList";
import Brands from "./components/Brands/Brands";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import Orders from "./components/Orders/Orders";
import UserContextProvider from "./Context/UserContext";
import CartContextProvider from "./Context/CartContext";
import WishlistContextProvider from "./Context/WishlistContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProtectedAuth from "./components/ProtectedAuth/ProtectedAuth";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import VerificationCode from "./components/VerificationCode/VerificationCode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import SubCategories from "./components/SubCategories/SubCategories";
import { Toaster } from "react-hot-toast";
import Checkout from "./components/Checkout/Checkout";
import Profile from "./components/Profile/Profile";

const queryClient = new QueryClient();

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: ":id/subcategories",
        element: (
          <ProtectedRoute>
            <SubCategories />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedAuth>
            <Login />
          </ProtectedAuth>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedAuth>
            <Register />
          </ProtectedAuth>
        ),
      },
      {
        path: "forgetpassword",
        element: (
          <ProtectedAuth>
            <ForgetPassword />
          </ProtectedAuth>
        ),
      },
      {
        path: "verificationcode",
        element: (
          <ProtectedAuth>
            <VerificationCode />
          </ProtectedAuth>
        ),
      },
      {
        path: "resetpassword",
        element: (
          <ProtectedAuth>
            <ResetPassword />
          </ProtectedAuth>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
            <RouterProvider router={routes}></RouterProvider>
            <Toaster />
          </WishlistContextProvider>
        </CartContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
