import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import DeleteModal from "../components/DeleteModal";

const Subcategory = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const fetchSubcategories = async () => {
    const res = await axios.get("http://localhost:5000/subcategories");
    setSubcategories(res.data);
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/subcategories/${deleteId}`);
    setDeleteId(null);
    fetchSubcategories();
  };

  return (
    <Layout>
      <div className="page-header">
        <h2>Subcategory</h2>
        <button
          className="add-btn"
          onClick={() => navigate("/subcategory/add")}
        >
          Add New
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Subcategory name</th>
            <th>Category name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {subcategories.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.id}</td>
              <td>{sub.name}</td>
              <td>{sub.categoryName}</td>
              <td
                className={
                  sub.status === "Active" ? "status-active" : "status-inactive"
                }
              >
                {sub.status}
              </td>
              <td>
                <span
                  className="action-btn"
                  onClick={() => navigate(`/subcategory/edit/${sub.id}`)}
                >
                  ✏️
                </span>
                <span
                  className="action-btn"
                  onClick={() => setDeleteId(sub.id)}
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

export default Subcategory;
