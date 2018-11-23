import React from 'react';
import './style.scss';

class Textbox extends React.PureComponent {
  render() {
    const { id, label, type, autoComplete } = this.props;
    return (
      <div className='textbox'>
        <label className='textbox__label'>{label}</label>
        <input 
          className='textbox__input' 
          id={id} 
          name={id} 
          type={type || 'text'}
          autoComplete={autoComplete}
        />
      </div>
    );
  };
}

export default Textbox;
