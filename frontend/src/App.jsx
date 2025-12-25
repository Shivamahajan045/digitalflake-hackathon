import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import AddCategory from "./pages/AddCategory";

import EditCategory from "./pages/EditCategory";

import Subcategory from "./pages/Subcategory";
import AddSubcategory from "./pages/AddSubcategory";
import EditSubcategory from "./pages/EditSubcategory";

import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";

import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/add" element={<AddCategory />} />
        <Route path="/category/edit/:id" element={<EditCategory />} />
        <Route path="/subcategory" element={<Subcategory />} />
        <Route path="/subcategory/add" element={<AddSubcategory />} />
        <Route path="/subcategory/edit/:id" element={<EditSubcategory />} />
        <Route path="/products" element={<Product />} />
        <Route path="/product/add" element={<AddProduct />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
