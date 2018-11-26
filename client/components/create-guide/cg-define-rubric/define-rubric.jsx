import React from 'react';
import { connect } from 'react-redux';
import './style.scss';

import SelectedSkills from '../selected-skills';
import Questions from '../questions';
import { DropDown } from 'components/ui';
import {
  GUIDE_ADD_QUESTION,
  GUIDE_DELETE_QUESTION,
  GUIDE_REORDER_QUESTION,
  GUIDE_SELECT_DURATION,
  GUIDE_REMOVE_SKILL
} from 'reducer/action-types';

const mapStateToProps = state => ({
  model: state.guide.model
});

const mapDispatchToProps = dispatch => ({
  onAddQuestion: () => dispatch({
    type: GUIDE_ADD_QUESTION
  }),
  onRemoveQuestion: question => dispatch({
    type: GUIDE_DELETE_QUESTION,
    payload: question
  }),
  onReorderQuestion: questions => dispatch({
    type: GUIDE_REORDER_QUESTION,
    payload: questions
  }),
  onSelectDuration: duration => dispatch({
    type: GUIDE_SELECT_DURATION,
    payload: duration
  }),
  onRemoveSkill: skill => dispatch({
    type: GUIDE_REMOVE_SKILL,
    payload: skill
  })
});

class DefineRubric extends React.PureComponent {
  render() {
    const { model, onAddQuestion, onRemoveQuestion, onReorderQuestion, onRemoveSkill, onSelectDuration } = this.props;
    return (
      <div className='define-rubric'>
        <div className='ss-selections'>
          <div className='ss-selections__left'>
            Selected:
            <SelectedSkills 
              skills={model.skills} 
              onRemove={onRemoveSkill}
            />
          </div>
          <div className='ss-selections__right'>
            Duration:
            <div className='select-dd-container'>
              <DropDown 
                items={[
                  { name: '30 min', value: 30 },
                  { name: '45 min', value: 45 },
                  { name: '1 hour', value: 60 }
                ]}
                selected={model.duration}
                defualtValue={30}
                onSelect={onSelectDuration}
              />
            </div>
          </div>
        </div>
        <div className='dd-edit-rubric'>
          <Questions 
            questions={model.questions}
            onAdd={onAddQuestion}
            onDelete={onRemoveQuestion}
            onReorder={onReorderQuestion}
          />
        </div>
      </div>
    );
  }

  onRemoveSkill = skill => console.log(skill);
}

export default connect(mapStateToProps, mapDispatchToProps)(DefineRubric);
