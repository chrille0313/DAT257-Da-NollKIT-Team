import React, {ReactNode} from 'react';
import './InfoPopUp.module.css'; // Create a corresponding CSS file for styling

interface PopupProps {
  onClose: () => void;
  children: ReactNode;
}

const Popup: React.FC<PopupProps> = ({ onClose, children }) => {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Popup;