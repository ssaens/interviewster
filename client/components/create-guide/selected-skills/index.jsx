import React from 'react';
import './style.scss';

const SkillTag = props => (
  <div className='selected-skill-tag rel'>
    {props.name}
    <span className='close' onClick={props.onClick}>
      <i className='icon ion-ios-close' />
    </span>
  </div>
);

const SelectedSkills = props => {
  if (!props.skills || !props.skills.length) {
    return (
      <div className='selected-skills'>
        None Selected
      </div>
    );
  }

  return (
    <div className='selected-skills'>
      {props.skills.map(skill =>
        <SkillTag key={skill._id} name={skill.name} onClick={() => props.onRemove(skill)} />
      )}
    </div>
  );
};

export default SelectedSkills;
