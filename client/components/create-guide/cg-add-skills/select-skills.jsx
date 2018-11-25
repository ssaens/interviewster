import React from 'react';
import { connect } from 'react-redux';
import { debounce } from 'throttle-debounce';

import { SearchBar, DropDown } from 'components/ui';
import SelectedSkills from '../selected-skills';
import SkillBox from '../skill-box';
import {
  GUIDE_SKILL_AUTOSUGGEST,
  GUIDE_SELECT_DURATION,
  ASYNC_START,
  ASYNC_END
} from 'reducer/action-types';
import { admin } from 'fetch';

const _fetch = debounce(500, (q, dispatch, getState) => {
  admin.getSkills(q).then(res => {
    if (q === getState().guide.meta.waitingFor) {
      return Promise.resolve(res.data);
    } else {
      return Promise.resolve(null);
    }
  }).catch(err => {
    return Promise.resolve(null);
  }).then(payload => dispatch({
    type: GUIDE_SKILL_AUTOSUGGEST,
    subtype: ASYNC_END,
    payload
  }));
})

const autoSuggestThunk = q => (dispatch, getState) => {
  dispatch({
    type: GUIDE_SKILL_AUTOSUGGEST,
    subtype: ASYNC_START,
    payload: q
  });
  _fetch(q, dispatch, getState);
};

const mapStateToProps = state => ({
  suggestions: state.guide.meta.suggestedSkills
});

const mapDispatchToProps = dispatch => ({
  autoSuggest: q => dispatch(autoSuggestThunk(q)),
  clearSuggest: () => {
    dispatch({
      type: GUIDE_SKILL_AUTOSUGGEST, subtype: ASYNC_START, payload: ''
    });
    dispatch({
      type: GUIDE_SKILL_AUTOSUGGEST, subtype: ASYNC_END, payload: null
    });
  },
  selectDuration: duration => dispatch({
    type: GUIDE_SELECT_DURATION, payload: duration
  })
}); 

class SelectSkills extends React.PureComponent {
  render() {
    const { skills, suggestions, loaded, featuredSkills, onAdd, onRemove } = this.props;
    return (
      <div className='select-skills'>
        <div className='ss-selections'>
          <div className='ss-selections__left'>
            Selected:
            <SelectedSkills 
              skills={skills} 
              onRemove={onRemove}
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
                defaultItem={{ name: '30 min', value: 30 }}
                onSelect={this.onSelectDuration}
              />
            </div>
          </div>
        </div>
        <div className='ss-autosuggest'>
          <SearchBar 
            placeholder='What skills and qualities do you want to select?'
            onChange={this.onQueryChange}
          />
          <div className='suggestions'>
            {suggestions && <SkillBox skills={suggestions} onClick={onAdd} />}
          </div>
        </div>
        <div className='ss-featured'>
          <div className='bold'>Featured:</div>
          <SkillBox 
            skills={featuredSkills} 
            busy={!loaded} 
            onClick={onAdd} 
          />
        </div>
      </div>
    );
  }

  onQueryChange = e => {
    const q = e.target.value;
    if (q) {
      this.props.autoSuggest(q);
    } else {
      this.props.clearSuggest();
    }
  }

  onSelectDuration = duration => {
    this.props.selectDuration(duration);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectSkills);
