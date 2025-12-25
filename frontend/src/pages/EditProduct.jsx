import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { API } from "../api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Active");

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [productsRes, categoriesRes, subcategoriesRes] = await Promise.all([
      axios.get(`${API}/products`),
      axios.get(`${API}/categories`),
      axios.get(`${API}/subcategories`),
    ]);

    const product = productsRes.data.find((p) => p.id === Number(id));

    if (!product) {
      alert("Product not found");
      navigate("/products");
      return;
    }

    setName(product.name);
    setPrice(product.price);
    setStatus(product.status);
    setCategoryId(product.categoryId);
    setSubcategoryId(product.subcategoryId);

    setCategories(categoriesRes.data);
    setSubcategories(subcategoriesRes.data);
  };

  const handleUpdate = async () => {
    const category = categories.find((c) => c.id === Number(categoryId));
    const subcategory = subcategories.find(
      (s) => s.id === Number(subcategoryId)
    );

    await axios.put(`http://localhost:5000/products/${id}`, {
      name,
      price,
      status,
      categoryId,
      categoryName: category.name,
      subcategoryId,
      subcategoryName: subcategory.name,
    });

    navigate("/products");
  };

  return (
    <Layout>
      <h2>Edit Product</h2>

      <div className="form-card">
        <div className="form-row">
          <label>Product Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-row">
          <label>Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Subcategory</label>
          <select
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
          >
            {subcategories
              .filter((s) => s.categoryId === Number(categoryId))
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>

        <div className="form-row">
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="cancel-btn" onClick={() => navigate("/products")}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleUpdate}>
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default EditProduct;
