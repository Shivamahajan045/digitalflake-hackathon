import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { API } from "../api";

const EditSubcategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const subs = await axios.get(`${API}/subcategories`);
    const cats = await axios.get(`${API}/categories`);

    const sub = subs.data.find((s) => s.id === Number(id));

    setName(sub.name);
    setStatus(sub.status);
    setCategoryId(sub.categoryId);
    setCategories(cats.data);
  };

  const handleUpdate = async () => {
    const category = categories.find((c) => c.id === Number(categoryId));

    await axios.put(`${API}/subcategories/${id}`, {
      name,
      categoryId,
      categoryName: category.name,
      status,
    });

    navigate("/subcategory");
  };

  return (
    <Layout>
      <h2>Edit Subcategory</h2>

      <div className="form-card">
        <div className="form-row">
          <label>Subcategory Name</label>
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
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
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
          <button className="save-btn" onClick={handleUpdate}>
            Save
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default EditSubcategory;
