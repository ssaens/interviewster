import React from 'react';
import './style.scss'

export default props => (
  <div className="modal rel">
    <div className="modal__dimmer" />
    <div className="modal__surface">
      {props.children}
    </div>
  </div>
);
