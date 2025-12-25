import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="header">
        <h3>digitalflake</h3>
        <div className="profile-icon" onClick={() => setShowModal(true)}>
          👤
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>⚠️ Log Out</h3>
            <p>Are you sure you want to log out?</p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="confirm-btn" onClick={handleLogout}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
