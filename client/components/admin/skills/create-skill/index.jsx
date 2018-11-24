import React from 'react';
import { connect } from 'react-redux';

import SkillForm from '../skill-form';
import {
  ADD_QUESTION,
  CREATE_SKILL,
  DELETE_QUESTION,
  REORDER_QUESTION,
  ASYNC_START,
  ASYNC_END
} from 'reducer/action-types';
import { admin } from 'fetch';

const createSkillThunk = model => dispatch => {
  dispatch({
    type: CREATE_SKILL,
    subtype: ASYNC_START
  });
  return admin.createSkill(model).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    return Promise.resolve([]);
  }).then(payload => dispatch({
    type: CREATE_SKILL,
    subtype: ASYNC_END,
    payload
  }));
}

const mapStateToProps = state => ({
  model: state.admin.skills.createFormModel
});

const mapDispatchToProps = dispatch => ({
  onAddQuestion: () => dispatch({ type: CREATE_SKILL, subtype: ADD_QUESTION }),
  onReorderQuestion: (list) => dispatch({
    type: CREATE_SKILL, 
    subtype: REORDER_QUESTION,
    payload: list
  }),
  onDeleteQuestion: (list) => dispatch({
    type: CREATE_SKILL,
    subtype: DELETE_QUESTION,
    payload: list
  }),
  onCreate: model => dispatch(createSkillThunk(model))
});

class CreateSkill extends React.PureComponent {
  render() {
    return (
      <div className='create-skill admin-section'>
        <div className='bold'>
          Create New Skill
        </div>
        <SkillForm
          model={this.props.model}
          onAdd={this.onAdd}
          onDelete={this.onDelete}
          onReorder={this.onReorder}
          onSubmit={this.onCreate} 
          onRubricUpdate={this.onRubricUpdate}
          busy={this.props.model.busy}
        />
      </div>
    );
  }

  onAdd = e => {
    this.props.onAddQuestion();
  }

  onDelete = item => {
    const curr = this.props.model.questions;
    const list = curr.filter(i => i !== item);
    this.props.onDeleteQuestion(list);
  }

  onReorder =  list => {
    this.props.onReorderQuestion(list);
  }

  onCreate = e => {
    e.preventDefault();
    this.props.onCreate({
      name: this.props.model.name,
      questions: this.props.model.questions.map(question => ({
        text: question.text,
        rubric: question.rubric
      }))
    });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateSkill);
