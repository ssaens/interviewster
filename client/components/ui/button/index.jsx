import React from 'react';
import classNames from 'classnames';
import './style.scss';

export default props => (
  <button className={classNames('button', { flex: props.flex, disabled: props.disabled || props.busy })} 
    onClick={props.onClick}
    disabled={props.busy || props.disabled}
  >
    {props.busy ? '...' : props.label}
  </button>
);
