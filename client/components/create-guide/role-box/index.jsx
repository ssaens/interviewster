import React from 'react';
import './style.scss';

const Role = props => (
  <div className='role-tag' onClick={props.onClick}>
    {props.model.name}
  </div>
);

class RoleBox extends React.Component {
  render() {
    const { roles, busy, onClick } = this.props;
    if (busy) {
      return (
        <div className='role-box'>
          <div className='role-box__empty'>
            Fetching roles...
          </div>
        </div>
      );
    }
    if (!roles || !roles.length) {
      return (
        <div className='role-box'>
          <div className='role-box__empty'>
            No Roles Found
          </div>
        </div>
      );
    }
    return (
      <div className='role-box'>
        {roles.map(role => 
          <Role key={role._id} model={role} onClick={() => onClick && onClick(role)} />
        )}
      </div>
    );
  }
}

export default RoleBox;
