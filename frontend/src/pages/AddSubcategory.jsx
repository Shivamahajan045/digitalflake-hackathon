import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { API } from "../api";

const AddSubcategory = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/categories`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleSave = async () => {
    const category = categories.find((c) => c.id === Number(categoryId));

    await axios.post("http://localhost:5000/subcategories", {
      name,
      categoryId,
      categoryName: category.name,
      status,
    });

    navigate("/subcategory");
  };

  return (
    <Layout>
      <h2>Add Subcategory</h2>

      <div className="form-card">
        <div className="form-row">
          <label>Subcategory Name</label>
          <input onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-row">
          <label>Category</label>
          <select onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Status</label>
          <select onChange={(e) => setStatus(e.target.value)}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            className="cancel-btn"
            onClick={() => navigate("/subcategory")}
          >
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

export default AddSubcategory;
