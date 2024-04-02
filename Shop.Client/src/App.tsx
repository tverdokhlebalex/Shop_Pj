import { Suspense } from "react";
import MainLayout from "./layouts/MainLayouts";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Product from "./components/Product/Product";
import Products from "./components/Products/Products";
import Home from "./components/Home/Home";
import AdminPage from "./components/AdminPage/AdminPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="products-list"
          element={
            <Suspense fallback={<Loader />}>
              <Products />
            </Suspense>
          }
        />
        <Route
          path="/:id"
          element={
            <Suspense fallback={<Loader />}>
              <Product />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<Loader />}>
              <AdminPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
