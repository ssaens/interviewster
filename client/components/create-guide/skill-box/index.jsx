import React from 'react';
import './style.scss';

const Skill = props => (
  <div className='skill-tag' onClick={props.onClick}>
    {props.model.name}
  </div>
);

class SkillBox extends React.Component {
  render() {
    const { skills, busy, onClick } = this.props;
    if (busy) {
      return (
        <div className='skill-box'>
          <div className='skill-box__empty'>
            Fetching skills...
          </div>
        </div>
      );
    }
    if (!skills.length) {
      return (
        <div className='skill-box'>
          <div className='skill-box__empty'>
            No Skills Found
          </div>
        </div>
      );
    }
    return (
      <div className='skill-box'>
        {skills.map(skill => 
          <Skill model={skill} onClick={() => onClick && onClick(skill)} />
        )}
      </div>
    );
  }
}

export default SkillBox;
