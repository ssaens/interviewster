import React from 'react';
import { connect } from 'react-redux';

import RolesForm from '../roles-form';
import {
  CREATE_ROLE,
  ATTACH_SKILL,
  REMOVE_SKILL,
  ASYNC_START,
  ASYNC_END
} from 'reducer/action-types';
import { admin } from 'fetch';

const createRoleThunk = model => dispatch => {
  dispatch({
    type: CREATE_ROLE,
    subtype: ASYNC_START
  });
  return admin.createRole(model).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    return Promise.resolve(err.response.data);
  }).then(payload => {
    dispatch({
      type: CREATE_ROLE,
      subtype: ASYNC_END,
      payload
    });
  });
};

const mapStateToProps = state => ({
  model: state.admin.roles.createRoleModel
});

const mapDispatchToProps = dispatch => ({
  onAttach: skills => dispatch({
    type: CREATE_ROLE,
    subtype: ATTACH_SKILL,
    payload: skills
  }),
  onRemove: skills => dispatch({
    type: CREATE_ROLE,
    subtype: REMOVE_SKILL,
    payload: skills
  }),
  onCreate: model => dispatch(createRoleThunk(model))
});

class CreateRole extends React.PureComponent {
  render() {
    return (
      <div className='create-role'>
        <div className='header bold'>
          Create New Role
        </div>
        <RolesForm 
          model={this.props.model}
          onAttach={this.onAttach}
          onRemove={this.onRemove}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }

  onSubmit = e => {
    const model = this.props.model;
    this.props.onCreate({
      name: model.name,
      skills: model.skills.map(skill => skill._id)
    });
  }

  onAttach = skill => {
    if (!this.props.model.skills.find(s => s === skill)) {
      const skills = [ ...this.props.model.skills, skill ];
      this.props.onAttach(skills);
    }
  }

  onRemove = skill => {
    const skills = this.props.model.skills.filter(s => s !== skill);
    this.props.onRemove(skills);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRole);
