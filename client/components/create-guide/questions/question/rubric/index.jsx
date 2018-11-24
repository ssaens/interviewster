import React from 'react';
import './style.scss';

const RubricItem = props => (
  <div className='rubric-body__item'>
    <span className='points'>
      {props.points}
    </span>
    <span className='desc'>
      {props.desc}
    </span>
  </div>
);

class Rubric extends React.Component {
  render() {
    const rubricItems = this.props.model.map(item => 
      <RubricItem points={item.points} desc={item.desc} />
    );
    return (
      <div className='rubric'>
        <div className='rubric-header bold'>
          Rubric
        </div>
        <div className='rubric-body'>
          {rubricItems}
        </div>
      </div>
    );
  }
}

export default Rubric;
