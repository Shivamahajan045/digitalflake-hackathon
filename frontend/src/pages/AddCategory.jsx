import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { API } from "../api.js";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!name) {
      alert("Category name is required");
      return;
    }

    await axios.post(`${API}/categories`, {
      name,
      image,
      status,
    });

    navigate("/category");
  };

  return (
    <Layout>
      <h2>Add Category</h2>

      <div className="form-card">
        <div className="form-row">
          <label>Category Name</label>
          <input
            type="text"
            placeholder="Enter category name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          {image && (
            <div className="image-preview">
              <img src={image} alt="preview" />
            </div>
          )}
        </div>

        <div className="form-row">
          <label>Status</label>
          <select onChange={(e) => setStatus(e.target.value)}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="cancel-btn" onClick={() => navigate("/category")}>
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

export default AddCategory;
