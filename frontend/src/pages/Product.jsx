import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import DeleteModal from "../components/DeleteModal";
import { API } from "../api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/products`);
    setProducts(res.data);
  };

  const handleDelete = async () => {
    await axios.delete(`${API}/products/${deleteId}`);
    setDeleteId(null);
    fetchProducts();
  };

  return (
    <Layout>
      <div className="page-header">
        <h2>Product</h2>
        <button className="add-btn" onClick={() => navigate("/product/add")}>
          Add New
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product name</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.categoryName}</td>
              <td>{p.subcategoryName}</td>
              <td>₹{p.price}</td>
              <td
                className={
                  p.status === "Active" ? "status-active" : "status-inactive"
                }
              >
                {p.status}
              </td>
              <td>
                <span
                  className="action-btn"
                  onClick={() => navigate(`/product/edit/${p.id}`)}
                >
                  ✏️
                </span>
                <span className="action-btn" onClick={() => setDeleteId(p.id)}>
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

export default Product;
