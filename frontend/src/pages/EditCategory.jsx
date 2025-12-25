import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { API } from "../api";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    const res = await axios.get(`${API}/categories`);
    const category = res.data.find((c) => c.id === Number(id));

    if (!category) {
      alert("Category not found");
      navigate("/category");
      return;
    }

    setName(category.name);
    setStatus(category.status);
    setImage(category.image);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async () => {
    if (!name) {
      alert("Category name is required");
      return;
    }

    await axios.put(`http://localhost:5000/categories/${id}`, {
      name,
      image,
      status,
    });

    navigate("/category");
  };

  return (
    <Layout>
      <h2>Edit Category</h2>

      <div className="form-card">
        <div className="form-row">
          <label>Category Name</label>
          <input
            type="text"
            value={name}
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
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="cancel-btn" onClick={() => navigate("/category")}>
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

export default EditCategory;
