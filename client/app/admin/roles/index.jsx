import React from 'react';
import { connect } from 'react-redux';

import AllRoles from './all';
import PopularRoles from './popular';
import CreateRole from 'components/admin/roles/create-role';
import { admin } from 'fetch';
import {
  ROLES_LOAD,
  POPULAR
} from 'reducer/action-types';

const loadPopularThunk = () => dispatch => {
  admin.getPopularRoles().then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    return Promise.resolve(err.response.data);
  }).then(payload => {
    dispatch({
      type: ROLES_LOAD,
      subtype: POPULAR,
      payload
    });
  });
};

const loadAllThunk = () => dispatch => {
  admin.getRoles().then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    return Promise.resolve(err.response.data);
  }).then(payload => {
    dispatch({
      type: ROLES_LOAD,
      payload
    });
  });
};

const mapStateToProps = state => ({
  popularLoaded: state.admin.roles.popularLoaded,
  popularRoles: state.admin.roles.popular,
  rolesBusy: state.admin.roles.rolesBusy,
  allRoles: state.admin.roles.roles
});

const mapDispatchToProps = dispatch => ({
  loadPopular: () => dispatch(loadPopularThunk()),
  loadAll: () => dispatch(loadAllThunk())
});

class Roles extends React.Component {
  componentWillMount() {
    this.props.loadPopular();
    this.props.loadAll();
  }

  render() {
    const { popularLoaded, popularRoles, rolesBusy, allRoles } = this.props;
    return (
      <div className='roles'>
        <PopularRoles busy={!popularLoaded} roles={popularRoles} />
        <AllRoles busy={rolesBusy} roles={allRoles} />
        <CreateRole />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
