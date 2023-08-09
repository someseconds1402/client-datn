import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import './IconWithTooltip.css'; // Import file CSS để tùy chỉnh hiển thị

function IconWithTooltip() {
  return (
    <div className="icon-container">
      <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
      <div className="tooltip">
        <span className="tooltip-text">Đời hư ảo đưa em vào cơn mê\nGọi em đến bên ai sát vai</span>
      </div>
    </div>
  );
}

export default IconWithTooltip;
