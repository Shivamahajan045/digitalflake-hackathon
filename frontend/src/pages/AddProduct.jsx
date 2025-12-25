import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Active");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/categories")
      .then((r) => setCategories(r.data));
    axios
      .get("http://localhost:5000/subcategories")
      .then((r) => setSubcategories(r.data));
  }, []);

  const handleSave = async () => {
    const category = categories.find((c) => c.id === Number(categoryId));
    const subcategory = subcategories.find(
      (s) => s.id === Number(subcategoryId)
    );

    await axios.post("http://localhost:5000/products", {
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
      <h2>Add Product</h2>

      <div className="form-card">
        <div className="form-row">
          <label>Product Name</label>
          <input onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-row">
          <label>Category</label>
          <select onChange={(e) => setCategoryId(e.target.value)}>
            <option>Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Subcategory</label>
          <select onChange={(e) => setSubcategoryId(e.target.value)}>
            <option>Select Subcategory</option>
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
          <input type="number" onChange={(e) => setPrice(e.target.value)} />
        </div>

        <div className="form-row">
          <label>Status</label>
          <select onChange={(e) => setStatus(e.target.value)}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="cancel-btn" onClick={() => navigate("/products")}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
