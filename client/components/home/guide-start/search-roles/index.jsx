import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { debounce } from 'throttle-debounce';

import SingleInput from 'components/ui/search-bar/single-input';
import { Button, SearchBar } from 'components/ui';
import { admin } from 'fetch';
import {
  ASYNC_START,
  ASYNC_END,
  GUIDE_ROLE_AUTOSUGGEST
} from 'reducer/action-types';

const autoSuggestThunk = q => (dispatch, getState) => {
  dispatch({
    type: GUIDE_ROLE_AUTOSUGGEST,
    subtype: ASYNC_START,
    payload: q
  });
  admin.getRoles(q).then(res => {
    if (q === getState().guide.meta.waitingFor) {
      return Promise.resolve(res.data);
    } else {
      return Promise.resolve(null);
    }
  }).catch(err => {
    return Promise.resolve(null);
  }).then(payload => dispatch({
    type: GUIDE_ROLE_AUTOSUGGEST,
    subtype: ASYNC_END,
    payload
  }));
};

const mapStateToProps = state => ({
  selected: state.guide.model.role,
  suggestions: state.guide.meta.suggestedRoles
});

const mapDispatchToProps = dispatch => ({
  autoSuggest: debounce(500, q => dispatch(autoSuggestThunk(q))),
  clearSuggest: () => dispatch({
    type: GUIDE_ROLE_AUTOSUGGEST, payload: null
  })
});

const SelectBox = props => (
  <div className='suggestion' onClick={props.onClick} >
    {props.role.name}
  </div>
);

class SearchRoles extends React.PureComponent {
  render() {
    const { selected, suggestions, onSelect } = this.props;
    return (
      <div className='search-roles'>
        <div className='search-roles__search'>
          <SingleInput
            selected={selected && selected.name}
            noMargin
            placeholder='What role are you hiring for?'
            onChange={this.onQueryChange}
            onClear={() => onSelect(null)}
          />
          <div className={classNames('search-roles__suggestions', { hidden: !suggestions || !suggestions.length })}>
            {suggestions && suggestions.map(role => 
              <SelectBox key={role._id} role={role} onClick={() => onSelect(role)} />
            )}
          </div>
        </div>
        <div className='search-roles__submit'>
          <Button 
            label='Get Started'
            disabled={!selected}
            onClick={this.onSubmit}
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

  onSubmit = () => {
    console.log(this.props.selected);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchRoles);
