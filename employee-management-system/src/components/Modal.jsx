// Modal.jsx
import React, { useState } from 'react';

function Modal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // Perform logout action here
    setIsOpen(false); // Close the modal after logout
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Confirmation</h2>
        <p>Are you sure you want to logout?</p>
        <div className="modal-actions">
          <button onClick={handleLogout}>Yes</button>
          <button onClick={() => setIsOpen(false)}>No</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
