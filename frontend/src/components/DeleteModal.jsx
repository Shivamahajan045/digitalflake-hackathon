const DeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>🗑 Delete</h3>
        <p>Are you sure you want to delete?</p>

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-btn" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
