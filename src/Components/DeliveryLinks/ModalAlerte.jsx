import React from "react";
import "./ModalAlerte.css";

function ModalAlerte({ open, onClose, message }) {
    if (!open) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="modal-close" onClick={onClose}>&times;</span>
                <div className="modal-message">{message}</div>
            </div>
        </div>
    );
}

export default ModalAlerte; 