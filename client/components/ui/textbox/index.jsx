import React from 'react';
import './style.scss';

export default props => {
  const { id, label, type, autoComplete, placeholder, onInput, value } = props;
  return (
    <div className='textbox'>
      <label className='textbox__label'>{label}</label>
      <input 
        className='textbox__input' 
        id={id} 
        name={id} 
        type={type || 'text'}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={onInput}
        value={value}
      />
    </div>
  );
};