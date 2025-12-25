import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import DeleteModal from "../components/DeleteModal";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get(`${API}/categories`);
    setCategories(res.data);
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/categories/${deleteId}`);
    setDeleteId(null);
    fetchCategories();
  };

  return (
    <Layout>
      <div className="page-header">
        <h2>Category</h2>

        <button className="add-btn" onClick={() => navigate("/category/add")}>
          Add New
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Category name</th>
            <th>Image</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>
                <img src={cat.image} alt="" />
              </td>
              <td
                className={
                  cat.status === "Active" ? "status-active" : "status-inactive"
                }
              >
                {cat.status}
              </td>
              <td>
                <span
                  className="action-btn"
                  onClick={() => navigate(`/category/edit/${cat.id}`)}
                >
                  ✏️
                </span>

                <span
                  className="action-btn"
                  onClick={() => setDeleteId(cat.id)}
                >
                  🗑
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteId && (
        <DeleteModal
          onCancel={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </Layout>
  );
};

export default Category;
