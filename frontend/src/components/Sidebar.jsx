import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h3 style={styles.logo}>digitalflake</h3>

      <Link style={styles.link} to="/dashboard">
        Home
      </Link>
      <Link style={styles.link} to="/category">
        Category
      </Link>
      <Link style={styles.link} to="/subcategory">
        Subcategory
      </Link>
      <Link style={styles.link} to="/products">
        Products
      </Link>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#fff",
    borderRight: "1px solid #ddd",
    padding: "20px",
  },
  logo: {
    color: "#6a2c91",
    marginBottom: "30px",
  },
  link: {
    display: "block",
    marginBottom: "15px",
    color: "#333",
    textDecoration: "none",
  },
};

export default Sidebar;
