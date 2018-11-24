import React from 'react';
import { connect } from 'react-redux';

import AllSkills from './all';
import CreateSkill from 'components/admin/skills/create-skill';
import FeaturedSkills from './featured';
import { admin } from 'fetch';
import {
  SKILLS_LOAD,
  FEATURED
} from 'reducer/action-types';

const loadSkillsThunk = () => dispatch => {
  admin.getSkills().then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    return Promise.resolve(err.response.data);
  }).then(payload => {
    dispatch({
      type: SKILLS_LOAD,
      payload
    });
  });
};

const loadFeaturedThunk = () => dispatch => {
  admin.getFeatured().then(res => {
    return Promise.resolve(res.data);
  }).catch(err => {
    return Promise.resolve(err.response.data); 
  }).then(payload => {
    dispatch({
      type: SKILLS_LOAD,
      subtype: FEATURED,
      payload
    });
  })
};

const mapStateToProps = state => ({
  featuredLoaded: state.admin.skills.featuredLoaded,
  featuredSkills: state.admin.skills.featured,
  allSkills: state.admin.skills.skills,
  skillsBusy: state.admin.skills.skillsBusy
});

const mapDispatchToProps = dispatch => ({
  loadSkills: () => dispatch(loadSkillsThunk()),
  loadFeatured: () => dispatch(loadFeaturedThunk())
});

class Skills extends React.PureComponent {
  componentWillMount() {
    this.props.loadSkills();
    this.props.loadFeatured();
  }

  render() {
    const { featuredSkills, featuredLoaded, allSkills, skillsBusy, createSkillModel } = this.props;
    return (
      <div className='roles'>
        <FeaturedSkills skills={featuredSkills} busy={!featuredLoaded} />
        <AllSkills skills={allSkills} busy={skillsBusy} />
        <CreateSkill />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
