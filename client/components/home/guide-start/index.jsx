import React from 'react';
import { connect } from 'react-redux';
import './style.scss';

import SearchRoles from './search-roles';
import PopularRoles from './popular-roles';
import {
  GUIDE_LOAD,
  GUIDE_SELECT_ROLE,
  POPULAR
} from 'reducer/action-types';
import { admin } from 'fetch';

const loadPopularThunk = () => dispatch => {
  admin.getPopularRoles(true).then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    return Promise.resolve(err.response.data);
  }).then(payload => {
    dispatch({
      type: GUIDE_LOAD,
      subtype: POPULAR,
      payload
    });
  });
};

const mapStateToProps = state => ({
  popularRoles: state.guide.meta.popularRoles,
  loaded: state.guide.meta.loadedRoles
});

const mapDispatchToProps = dispatch => ({
  loadPopularRoles: () => dispatch(loadPopularThunk()),
  selectRole: role => dispatch({ type: GUIDE_SELECT_ROLE, payload: role })
});

class GuideStart extends React.PureComponent {
  componentWillMount() {
    this.props.loadPopularRoles();
  }

  render() {
    const { loaded, popularRoles, selectedRole } = this.props;
    return (
      <div className='guide-start'>
        <SearchRoles onSelect={this.props.selectRole} />
        <PopularRoles busy={!loaded} roles={popularRoles} onClick={this.props.selectRole} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuideStart); 
