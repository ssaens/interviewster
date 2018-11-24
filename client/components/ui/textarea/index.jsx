import React from 'react';
import './style.scss';

export default props => {
  const { id, label, placeholder, onInput } = props;
  return (
    <div className='textarea'>
      <label className='textarea__label'>{label}</label>
      <textarea 
        className='textarea__input' 
        id={id} 
        name={id}
        placeholder={placeholder}
        onInput={onInput}
      />
    </div>
  );
};
