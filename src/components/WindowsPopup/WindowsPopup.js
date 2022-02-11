import React from "react";
import "./WindowsPopup.scss";

const WindowsPopup = ({ className, onClose,onClickContent, title, children }) => {
  return (
    <div className={`show-box ${className}`}>
      <div className="windows-header-wrapper">
        <div className="window-title">"{title}"</div>
        <div className="window-icons">
          <img 
            src="https://canary---yellow.com/wp-content/themes/virgilabloh/images/icon-iconize.jpg"
            alt="min"
          />
          <img
            src="https://canary---yellow.com/wp-content/themes/virgilabloh/images/icon-resize.jpg"
            alt="max"
          />
          <img
            onClick={onClose}
            src="https://canary---yellow.com/wp-content/themes/virgilabloh/images/icon-close.jpg"
            alt="close"
          />
        </div>
      </div>
      <div onClick={onClickContent} className="look-content">
          {children}
      </div>
    </div>
  );
};

export default WindowsPopup;
